"use client";

import { ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import type { MenuItem } from "@/src/data/menu";

type CartSummaryProps = {
  items: MenuItem[];
  quantities: Record<string, number>;
  selectedOptions: Record<string, string>;
  onDecrease: (itemId: string, optionLabel?: string) => void;
  onIncrease: (itemId: string, optionLabel?: string) => void;
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
}: CartSummaryProps) {
  const [isOpen, setIsOpen] = useState(false);

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

  const cartGroups: CartGroup[] = items.reduce<CartGroup[]>((groups, item) => {
    const lines = cartLines.filter((line) => line.item.id === item.id);

    if (lines.length === 0) return groups;

    return [...groups, { item, lines }];
  }, []);

  const totalQuantity = cartLines.reduce(
    (total, line) => total + line.quantity,
    0,
  );

  const totalPrice = cartLines.reduce(
    (total, line) => total + line.price * line.quantity,
    0,
  );

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
        >
          <span className="flex items-center gap-2 text-sm font-bold text-(--ink)">
            <ShoppingBag size={18} aria-hidden="true" />
            السلة ({totalQuantity})
          </span>
          <span className="text-sm font-bold text-(--accent)">{totalPrice} جنيه</span>
        </button>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-90 bg-black/60 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="السلة"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="absolute inset-x-4 bottom-4 mx-auto max-h-[75vh] w-auto max-w-lg overflow-y-auto rounded-2xl border border-(--line) bg-(--surface) p-4 shadow-[0_20px_50px_rgba(0,0,0,0.35)] sm:left-1/2 sm:right-auto sm:w-full sm:-translate-x-1/2"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 border-b border-(--line) pb-3">
              <div>
                <h2 className="text-lg font-bold text-(--ink)">السلة</h2>
                <p className="mt-1 text-xs text-(--ink-soft)">{totalQuantity} صنف</p>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="إغلاق السلة"
                className="inline-flex size-10 items-center justify-center rounded-full text-(--ink-soft) transition-colors hover:bg-(--accent-glow) hover:text-(--ink) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>

            <div className="divide-y divide-(--line)">
              {cartGroups.map((group) => (
                <div key={group.item.id} className="py-3">
                  <h3 className="text-sm font-bold text-(--ink)">
                    {group.item.name}
                  </h3>

                  <div className="mt-2 space-y-2">
                    {group.lines.map((line) => (
                      <div
                        key={`${line.item.id}-${line.optionLabel ?? "default"}`}
                        className="flex items-center gap-3"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="text-xs text-(--ink-soft)">
                            {line.optionLabel ? `${line.optionLabel} · ` : ""}
                            {line.price} جنيه × {line.quantity}
                          </p>
                        </div>

                        <div className="flex shrink-0 items-center gap-1 rounded-lg border border-(--line) p-1">
                          <button
                            type="button"
                            onClick={() =>
                              onIncrease(line.item.id, line.optionLabel)
                            }
                            aria-label={`زود ${line.item.name}${line.optionLabel ? ` - ${line.optionLabel}` : ""}`}
                            className="flex size-8 items-center justify-center rounded-md text-base font-bold text-(--ink) hover:bg-(--accent-glow)"
                          >
                            +
                          </button>
                          <span className="min-w-6 text-center text-sm font-bold text-(--ink)">
                            {line.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              onDecrease(line.item.id, line.optionLabel)
                            }
                            aria-label={`قلل ${line.item.name}${line.optionLabel ? ` - ${line.optionLabel}` : ""}`}
                            className="flex size-8 items-center justify-center rounded-md text-base font-bold text-(--ink) hover:bg-(--accent-glow)"
                          >
                            −
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-2 flex items-center justify-between border-t border-(--line) pt-4">
              <span className="text-sm text-(--ink-soft)">الإجمالي</span>
              <span className="text-base font-bold text-(--accent)">{totalPrice} جنيه</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
