"use client";

import { MessageCircle, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import type { MenuItem } from "@/src/data/menu";
import { restaurantConfig } from "@/src/data/restaurant";
import { createOrderReceiptImage } from "@/src/utils/createOrderReceiptImage";

type CartSummaryProps = {
  items: MenuItem[];
  quantities: Record<string, number>;
  selectedOptions?: Record<string, string>;
  onDecrease: (itemId: string, optionLabel?: string) => void;
  onIncrease: (itemId: string, optionLabel?: string) => void;
  onClear?: () => void;
};

type CartLine = {
  item: MenuItem;
  optionLabel?: string;
  price: number;
  quantity: number;
};

type CartGroup = {
  item: MenuItem;
  lines: CartLine[];
};

const getQuantityKey = (itemId: string, optionLabel?: string) =>
  optionLabel ? `${itemId}::${optionLabel}` : itemId;

export default function CartSummary({
  items,
  quantities,
  onDecrease,
  onIncrease,
  onClear,
}: CartSummaryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const cartLines: CartLine[] = items.flatMap((item) => {
    if (item.priceOptions?.length) {
      return item.priceOptions
        .map((option) => ({
          item,
          optionLabel: option.label,
          price: option.price,
          quantity: quantities[getQuantityKey(item.id, option.label)] ?? 0,
        }))
        .filter((line) => line.quantity > 0);
    }

    const quantity = quantities[item.id] ?? 0;

    return quantity > 0
      ? [
          {
            item,
            price: item.price ?? 0,
            quantity,
          },
        ]
      : [];
  });

  const cartGroups: CartGroup[] = items.reduce<CartGroup[]>(
    (groups, item) => {
      const lines = cartLines.filter((line) => line.item.id === item.id);

      if (lines.length === 0) return groups;

      return [...groups, { item, lines }];
    },
    [],
  );

  const totalQuantity = cartLines.reduce(
    (total, line) => total + line.quantity,
    0,
  );

  const totalPrice = cartLines.reduce(
    (total, line) => total + line.price * line.quantity,
    0,
  );

  const handleWhatsAppOrder = async () => {
    if (isSending) return;

    setIsSending(true);

    const currentTime = new Date().toLocaleTimeString("ar-EG", {
      hour: "numeric",
      minute: "2-digit",
    });

    const orderLines = cartGroups
      .map((group) => {
        const lines = group.lines
          .map((line) => {
            const option = line.optionLabel
              ? ` — ${line.optionLabel}`
              : "";

            const lineTotal = line.price * line.quantity;

            return `${group.item.name}${option} × ${line.quantity} = ${lineTotal} جنيه`;
          })
          .join("\n");

        return `*${lines}*`;
      })
      .join("\n\n");

    const message = [
      `*طلب جديد من ${restaurantConfig.name}*`,
      "",
      `*الوقت:* ${currentTime}`,
      "",
      "*الطلب:*",
      "",
      orderLines,
      "",
      `💰 *الإجمالي: ${totalPrice} جنيه*`,
    ].join("\n");

    const whatsappNumber = `20${restaurantConfig.location.whatsapp.slice(1)}`;
    const whatsappUrl =
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    try {
      const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

      if (isMobile && navigator.share) {
        const receiptBlob = await createOrderReceiptImage({
          restaurantName: restaurantConfig.name,
          time: currentTime,
          groups: cartGroups.map((group) => ({
            itemName: group.item.name,
            lines: group.lines.map((line) => ({
              itemName: line.item.name,
              optionLabel: line.optionLabel,
              quantity: line.quantity,
              lineTotal: line.price * line.quantity,
            })),
          })),
          totalPrice,
        });

        const receiptFile = new File(
          [receiptBlob],
          "k-runch-order.png",
          { type: "image/png" },
        );

        const canShareReceipt =
          typeof navigator.canShare === "function" &&
          navigator.canShare({ files: [receiptFile] });

        if (canShareReceipt) {
          try {
            await navigator.share({
              files: [receiptFile],
              text: message,
              title: `طلب من ${restaurantConfig.name}`,
            });

            return;
          } catch (error) {
            if (error instanceof DOMException && error.name === "AbortError") {
              return;
            }
          }
        }
      }

      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    } finally {
      setIsSending(false);
    }
  };

  const handleClearCart = () => {
    onClear?.();
    setIsOpen(false);
  };

  if (cartLines.length === 0) return null;

  return (
    <>
      <div className="fixed inset-x-4 bottom-4 z-40 sm:left-auto sm:right-6 sm:w-full sm:max-w-sm">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex min-h-14 w-full items-center justify-between gap-3 rounded-2xl border border-(--accent) bg-(--surface) px-4 py-3 text-right shadow-[0_14px_36px_rgba(0,0,0,0.28)] transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)"
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          aria-label="مراجعة الطلب"
        >
          <span className="flex items-center text-sm font-bold text-(--ink)">
            <ShoppingBag size={18} aria-hidden="true" />

            <span className="mr-2">راجع طلبك</span>

            <span className="mr-6">({totalQuantity}) أصناف</span>
          </span>

          <span className="text-sm font-bold text-(--accent)">
            {totalPrice} جنيه
          </span>
        </button>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-90 bg-black/60 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="مراجعة الطلب"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="absolute inset-x-4 bottom-4 mx-auto max-h-[80vh] w-auto max-w-lg overflow-y-auto rounded-2xl border border-(--line) bg-(--surface) p-5 shadow-[0_20px_50px_rgba(0,0,0,0.35)] sm:left-1/2 sm:right-auto sm:w-full sm:-translate-x-1/2"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 border-b border-(--line) pb-4">
              <div>
                <h2 className="text-xl font-bold text-(--ink)">
                  سلة الطلب
                </h2>

                <p className="mt-1 text-sm text-(--ink-soft)">
                  {totalQuantity} صنف
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="إغلاق السلة"
                className="inline-flex size-11 items-center justify-center rounded-full border border-(--line) text-(--ink) transition-colors hover:bg-(--accent-glow) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)"
              >
                <X size={22} strokeWidth={2.5} aria-hidden="true" />
              </button>
            </div>

            <div className="divide-y divide-(--line)">
              {cartGroups.map((group) => (
                <div key={group.item.id} className="py-4">
                  <h3 className="text-base font-bold text-(--ink)">
                    {group.item.name}
                  </h3>

                  <div className="mt-3 space-y-3">
                    {group.lines.map((line) => {
                      const lineTotal = line.price * line.quantity;

                      return (
                        <div
                          key={`${line.item.id}-${line.optionLabel ?? "default"}`}
                          className="flex items-center gap-3"
                        >
                          <div className="min-w-0 flex-1">
                            {line.optionLabel && (
                              <p className="text-sm font-semibold text-(--ink)">
                                {line.optionLabel}
                              </p>
                            )}

                            <p className="mt-1 text-xs text-(--ink-soft)">
                              {line.price} جنيه × {line.quantity} ={" "}
                              {lineTotal} جنيه
                            </p>
                          </div>

                          <div className="flex shrink-0 items-center gap-1 rounded-xl border border-(--line) p-1">
                            <button
                              type="button"
                              onClick={() =>
                                onIncrease(line.item.id, line.optionLabel)
                              }
                              aria-label={`زود ${line.item.name}${
                                line.optionLabel
                                  ? ` - ${line.optionLabel}`
                                  : ""
                              }`}
                              className="flex size-8 items-center justify-center rounded-lg text-base font-bold text-(--ink) transition-colors hover:bg-(--accent-glow)"
                            >
                              +
                            </button>

                            <span className="min-w-7 text-center text-sm font-bold text-(--ink)">
                              {line.quantity}
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                onDecrease(line.item.id, line.optionLabel)
                              }
                              aria-label={`قلل ${line.item.name}${
                                line.optionLabel
                                  ? ` - ${line.optionLabel}`
                                  : ""
                              }`}
                              className="flex size-8 items-center justify-center rounded-lg text-base font-bold text-(--ink) transition-colors hover:bg-(--accent-glow)"
                            >
                              −
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-2 border-t border-(--line) pt-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-(--ink-soft)">
                  الإجمالي
                </span>

                <span className="text-lg font-bold text-(--ink)">
                  {totalPrice} جنيه
                </span>
              </div>

              <button
                type="button"
                onClick={handleWhatsAppOrder}
                disabled={isSending}
                aria-busy={isSending}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-(--accent) px-4 py-3.5 text-sm font-bold text-(--surface) shadow-[0_8px_24px_rgba(0,0,0,0.14)] transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(0,0,0,0.18)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent) motion-safe:animate-[pulse_3s_ease-in-out_infinite] disabled:pointer-events-none disabled:opacity-70 disabled:motion-safe:animate-none"
              >
                <MessageCircle size={19} aria-hidden="true" />
                {isSending ? "جاري تجهيز الطلب..." : "اطلب على واتساب"}
              </button>

              {onClear && (
                <button
                  type="button"
                  onClick={handleClearCart}
                  className="mt-3 w-full rounded-xl px-4 py-2.5 text-sm font-semibold text-(--ink-soft) transition-colors hover:bg-(--accent-glow) hover:text-(--ink)"
                >
                  مسح السلة
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
