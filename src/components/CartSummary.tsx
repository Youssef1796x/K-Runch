"use client";

import { ArrowRight, MapPin, MessageCircle, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import type { MenuItem } from "@/src/data/menu";
import { restaurantConfig } from "@/src/data/restaurant";

type CartSummaryProps = {
  items: MenuItem[];
  quantities: Record<string, number>;
  onDecrease: (itemId: string, optionLabel?: string) => void;
  onIncrease: (itemId: string, optionLabel?: string) => void;
  onClear?: () => void;
};

type CartLine = { item: MenuItem; optionLabel?: string; price: number; quantity: number };
type CartGroup = { item: MenuItem; lines: CartLine[] };
type CheckoutStep = "cart" | "details" | "review";
type CustomerDetails = {
  name: string;
  phone: string;
  fulfillment: "delivery" | "pickup";
  address: string;
  locationUrl: string;
  notes: string;
};

const getQuantityKey = (itemId: string, optionLabel?: string) =>
  optionLabel ? `${itemId}::${optionLabel}` : itemId;

const initialCustomerDetails: CustomerDetails = {
  name: "",
  phone: "",
  fulfillment: "delivery",
  address: "",
  locationUrl: "",
  notes: "",
};

export default function CartSummary({
  items,
  quantities,
  onDecrease,
  onIncrease,
  onClear,
}: CartSummaryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<CheckoutStep>("cart");
  const [customer, setCustomer] = useState<CustomerDetails>(initialCustomerDetails);
  const [error, setError] = useState("");
  const [orderSent, setOrderSent] = useState(false);

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
    return quantity > 0 ? [{ item, price: item.price ?? 0, quantity }] : [];
  });

  const cartGroups: CartGroup[] = items.reduce<CartGroup[]>((groups, item) => {
    const lines = cartLines.filter((line) => line.item.id === item.id);
    return lines.length ? [...groups, { item, lines }] : groups;
  }, []);

  const totalQuantity = cartLines.reduce((total, line) => total + line.quantity, 0);
  const totalPrice = cartLines.reduce((total, line) => total + line.price * line.quantity, 0);

  const resetCheckout = () => {
    setStep("cart");
    setError("");
    setOrderSent(false);
  };

  const closeModal = () => {
    setIsOpen(false);
    resetCheckout();
  };

  const openModal = () => {
    setIsOpen(true);
    resetCheckout();
  };

  const updateCustomer = <K extends keyof CustomerDetails>(
    key: K,
    value: CustomerDetails[K],
  ) => {
    setCustomer((current) => ({ ...current, [key]: value }));
    setError("");
  };

  const handleFulfillmentChange = (fulfillment: "delivery" | "pickup") => {
    setCustomer((current) => ({
      ...current,
      fulfillment,
      ...(fulfillment === "pickup" ? { address: "", locationUrl: "" } : {}),
    }));
    setError("");
  };

  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      setError("المتصفح مش بيدعم تحديد الموقع.");
      return;
    }

    setError("");
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setCustomer((current) => ({
          ...current,
          locationUrl: `https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`,
        }));
      },
      () => {
        setError("مش قادر أحدد موقعك، اكتب العنوان يدويًا.");
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
    );
  };

  const validateDetails = () => {
    const name = customer.name.trim();
    const phone = customer.phone.replace(/\s+/g, "");

    if (name.length < 2) {
      setError("اكتب اسمك عشان نعرف الطلب باسم مين.");
      return false;
    }

    if (!/^01\d{9}$/.test(phone)) {
      setError("اكتب رقم موبايل مصري صحيح من 11 رقم.");
      return false;
    }

    if (customer.fulfillment === "delivery" && customer.address.trim().length < 5) {
      setError("اكتب عنوان التوصيل بالتفصيل.");
      return false;
    }

    return true;
  };

  const handleNext = () => {
    if (step === "cart") {
      setStep("details");
      setError("");
    } else if (step === "details" && validateDetails()) {
      setStep("review");
      setError("");
    }
  };

  const handleBack = () => {
    setError("");
    setStep((current) => (current === "review" ? "details" : "cart"));
  };

  const handleWhatsAppOrder = () => {
    const rtlMark = "\u200F";
    const currentTime = new Date().toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });

    const orderLines = cartGroups
      .map((group) => {
        const lines = group.lines
          .map((line) => {
            const lineTotal = line.price * line.quantity;
            if (line.optionLabel) {
              return `${rtlMark}${line.optionLabel} × ${line.quantity} = ${lineTotal} جنيه`;
            }
            return line.quantity === 1
              ? `${rtlMark}*${line.item.name}*  •  ${lineTotal} جنيه`
              : `${rtlMark}*${line.item.name}* × ${line.quantity} = ${lineTotal} جنيه`;
          })
          .join("\n");

        return group.lines.some((line) => line.optionLabel)
          ? `${rtlMark}*${group.item.name}*\n${lines}`
          : lines;
      })
      .join("\n\n");

    const normalizedPhone = customer.phone.replace(/\s+/g, "");
    const message = [
      `${rtlMark}*طلب جديد من ${restaurantConfig.name}*`,
      "",
      `${rtlMark}*الطلب:*`,
      "",
      orderLines,
      "",
      `${rtlMark}💰 *الإجمالي: ${totalPrice} جنيه*`,
      "",
      `${rtlMark}🕐 *الوقت* ${currentTime}`,
      "",
      `${rtlMark}*العميل:*`,
      `${rtlMark}الاسم: ${customer.name.trim()}`,
      `${rtlMark}الهاتف: ${normalizedPhone}`,
      `${rtlMark}الاستلام: ${customer.fulfillment === "delivery" ? "توصيل" : "من المطعم"}`,
      ...(customer.fulfillment === "delivery"
        ? [
            `${rtlMark}العنوان: ${customer.address.trim()}`,
            ...(customer.locationUrl ? [`${rtlMark}الموقع: ${customer.locationUrl}`] : []),
          ]
        : []),
      ...(customer.notes.trim() ? [`${rtlMark}ملاحظات: ${customer.notes.trim()}`] : []),
    ].join("\n");

    const whatsappNumber = `20${restaurantConfig.location.whatsapp.slice(1)}`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setError("");
    setOrderSent(true);
  };

  const handleClearCart = () => {
    onClear?.();
    setCustomer(initialCustomerDetails);
    closeModal();
  };

  if (cartLines.length === 0) return null;

  const stepTitle = orderSent
    ? "الطلب جاهز"
    : step === "cart"
      ? "سلة الطلب"
      : step === "details"
        ? "بيانات الطلب"
        : "راجع طلبك";

  return (
    <>
      <div className="fixed inset-x-4 bottom-4 z-40 sm:left-auto sm:right-6 sm:w-full sm:max-w-sm">
        <button
          type="button"
          onClick={openModal}
          className="flex min-h-14 w-full items-center justify-between gap-3 rounded-2xl border border-(--accent) bg-(--surface) px-4 py-3 text-right shadow-[0_14px_36px_rgba(0,0,0,0.28)] transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)"
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          aria-label="فتح الطلب"
        >
          <span className="flex items-center text-sm font-bold text-(--ink)">
            <ShoppingBag size={18} aria-hidden="true" />
            <span className="relative isolate mr-2 inline-flex min-w-20 items-center justify-center">
              <span
                aria-hidden="true"
                className="order-cta-pulse pointer-events-none absolute inset-[-6px] rounded-full border-2 border-(--accent)"
              />
              <span className="relative z-10 drop-shadow-[0_0_10px_rgba(232,199,90,0.45)]">اطلب الآن</span>
            </span>
            <span className="mr-6">({totalQuantity}) أصناف</span>
          </span>
          <span className="text-sm font-bold text-(--accent)">{totalPrice} جنيه</span>
        </button>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-90 bg-black/60 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="مراجعة الطلب"
          onClick={closeModal}
        >
          <div
            className="absolute inset-x-4 top-4 bottom-4 mx-auto w-auto max-w-lg overflow-y-auto overscroll-contain rounded-2xl border border-(--line) bg-(--surface) p-5 shadow-[0_20px_50px_rgba(0,0,0,0.35)] sm:left-1/2 sm:right-auto sm:top-1/2 sm:bottom-auto sm:max-h-[90vh] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 border-b border-(--line) pb-4">
              <div>
                <h2 className="text-xl font-bold text-(--ink)">{stepTitle}</h2>
                <p className="mt-1 text-sm text-(--ink-soft)">
                  {orderSent
                    ? "اتفتح واتساب بالطلب الجاهز"
                    : step === "cart"
                      ? `${totalQuantity} صنف`
                      : step === "details"
                        ? "بيانات بسيطة ونبعت الطلب"
                        : "راجع بياناتك قبل الإرسال"}
                </p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                aria-label="إغلاق الطلب"
                className="inline-flex size-11 items-center justify-center rounded-full border border-(--line) text-(--ink) transition-colors hover:bg-(--accent-glow) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)"
              >
                <X size={22} strokeWidth={2.5} aria-hidden="true" />
              </button>
            </div>

            {orderSent ? (
              <div className="py-8 text-center">
                <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-(--accent-glow) text-2xl font-bold text-(--accent)">
                  ✓
                </div>
                <h3 className="mt-5 text-lg font-bold text-(--ink)">
                  الطلب جاهز في واتساب
                </h3>
                <p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-(--ink-soft)">
                  فتحنا واتساب ومعاه تفاصيل طلبك. اضغط إرسال من داخل واتساب لإرسال الطلب للمطعم.
                </p>

                <div className="mt-6 space-y-2">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="w-full rounded-xl bg-(--accent) px-4 py-3.5 text-sm font-bold text-(--surface) shadow-[0_8px_24px_rgba(0,0,0,0.14)] transition-all hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)"
                  >
                    الرجوع للمنيو
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderSent(false)}
                    className="w-full rounded-xl border border-(--line) px-4 py-3 text-sm font-semibold text-(--ink-soft) transition-colors hover:border-(--accent) hover:text-(--ink)"
                  >
                    عرض الطلب مرة تانية
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-5 mt-4 flex items-center gap-2 text-xs font-bold text-(--ink-muted)">
                  <span className={step === "cart" ? "text-(--accent)" : ""}>1 السلة</span>
                  <span aria-hidden="true">←</span>
                  <span className={step === "details" ? "text-(--accent)" : ""}>2 بياناتك</span>
                  <span aria-hidden="true">←</span>
                  <span className={step === "review" ? "text-(--accent)" : ""}>3 المراجعة</span>
                </div>

                {step === "cart" ? (
                  <>
                    <div className="divide-y divide-(--line)">
                      {cartGroups.map((group) => (
                        <div key={group.item.id} className="py-4 first:pt-0">
                          <h3 className="text-base font-bold text-(--ink)">{group.item.name}</h3>
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
                                      {line.price} جنيه × {line.quantity} = {lineTotal} جنيه
                                    </p>
                                  </div>
                                  <div className="flex shrink-0 items-center gap-1 rounded-xl border border-(--line) p-1">
                                    <button
                                      type="button"
                                      onClick={() => onIncrease(line.item.id, line.optionLabel)}
                                      className="flex size-8 items-center justify-center rounded-lg text-base font-bold text-(--ink) transition-colors hover:bg-(--accent-glow) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)"
                                      aria-label={`زود ${line.item.name}`}
                                    >
                                      +
                                    </button>
                                    <span className="min-w-7 text-center text-sm font-bold text-(--ink)">
                                      {line.quantity}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => onDecrease(line.item.id, line.optionLabel)}
                                      className="flex size-8 items-center justify-center rounded-lg text-base font-bold text-(--ink) transition-colors hover:bg-(--accent-glow) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)"
                                      aria-label={`قلل ${line.item.name}`}
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
                        <span className="text-sm font-semibold text-(--ink-soft)">الإجمالي</span>
                        <span className="text-lg font-bold text-(--ink)">{totalPrice} جنيه</span>
                      </div>
                      <button
                        type="button"
                        onClick={handleNext}
                        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-(--accent) px-4 py-3.5 text-sm font-bold text-(--surface) shadow-[0_8px_24px_rgba(0,0,0,0.14)] transition-all hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)"
                      >
                        التالي
                        <ArrowRight size={18} aria-hidden="true" />
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
                  </>
                ) : step === "details" ? (
                  <div className="space-y-5">
                    <div>
                      <label htmlFor="checkout-name" className="text-sm font-bold text-(--ink)">
                        الاسم
                      </label>
                      <input
                        id="checkout-name"
                        type="text"
                        value={customer.name}
                        onChange={(event) => updateCustomer("name", event.target.value)}
                        placeholder="اكتب اسمك"
                        autoComplete="name"
                        className="mt-2 w-full rounded-xl border border-(--line) bg-background px-4 py-3 text-sm text-(--ink) outline-none transition-colors placeholder:text-(--ink-muted) focus:border-(--accent)"
                      />
                    </div>
                    <div>
                      <label htmlFor="checkout-phone" className="text-sm font-bold text-(--ink)">
                        رقم الموبايل
                      </label>
                      <input
                        id="checkout-phone"
                        type="tel"
                        value={customer.phone}
                        onChange={(event) => updateCustomer("phone", event.target.value)}
                        placeholder="01xxxxxxxxx"
                        inputMode="numeric"
                        autoComplete="tel"
                        maxLength={11}
                        className="mt-2 w-full rounded-xl border border-(--line) bg-background px-4 py-3 text-sm text-(--ink) outline-none transition-colors placeholder:text-(--ink-muted) focus:border-(--accent)"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-(--ink)">طريقة الاستلام</p>
                      <div className="mt-2 grid grid-cols-2 gap-2">
                        {(["delivery", "pickup"] as const).map((value) => {
                          const selected = customer.fulfillment === value;
                          return (
                            <button
                              key={value}
                              type="button"
                              onClick={() => handleFulfillmentChange(value)}
                              aria-pressed={selected}
                              className={`rounded-xl border px-3 py-3 text-sm font-bold transition-colors ${
                                selected
                                  ? "border-(--accent) bg-(--accent) text-black"
                                  : "border-(--line) bg-background text-(--ink-soft) hover:border-(--accent) hover:text-(--ink)"
                              }`}
                            >
                              {value === "delivery" ? "توصيل" : "من المطعم"}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    {customer.fulfillment === "delivery" ? (
                      <div>
                        <label htmlFor="checkout-address" className="text-sm font-bold text-(--ink)">
                          عنوان التوصيل
                        </label>
                        <textarea
                          id="checkout-address"
                          value={customer.address}
                          onChange={(event) => updateCustomer("address", event.target.value)}
                          placeholder="اكتب عنوانك"
                          autoComplete="street-address"
                          rows={3}
                          className="mt-2 w-full resize-none rounded-xl border border-(--line) bg-background px-4 py-3 text-sm leading-6 text-(--ink) outline-none transition-colors placeholder:text-(--ink-muted) focus:border-(--accent)"
                        />
                        <button
                          type="button"
                          onClick={handleUseLocation}
                          className="mt-2 inline-flex items-center gap-2 rounded-lg border border-(--line) px-3 py-2 text-xs font-bold text-(--ink-soft) transition-colors hover:border-(--accent) hover:text-(--ink) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)"
                        >
                          <MapPin size={15} aria-hidden="true" />
                          {customer.locationUrl ? "تم تحديث الموقع" : "تحديد موقعي"}
                        </button>
                      </div>
                    ) : null}
                    <div>
                      <label htmlFor="checkout-notes" className="text-sm font-bold text-(--ink)">
                        ملاحظات <span className="font-normal text-(--ink-muted)">(اختياري)</span>
                      </label>
                      <textarea
                        id="checkout-notes"
                        value={customer.notes}
                        onChange={(event) => updateCustomer("notes", event.target.value)}
                        rows={2}
                        className="mt-2 w-full resize-none rounded-xl border border-(--line) bg-background px-4 py-3 text-sm leading-6 text-(--ink) outline-none transition-colors placeholder:text-(--ink-muted) focus:border-(--accent)"
                      />
                    </div>
                    {error ? (
                      <p className="rounded-xl border border-(--accent)/30 bg-(--accent-glow) px-3 py-2.5 text-sm font-semibold leading-6 text-(--ink)">
                        {error}
                      </p>
                    ) : null}
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={handleBack}
                        className="flex-1 rounded-xl border border-(--line) px-4 py-3.5 text-sm font-bold text-(--ink) transition-colors hover:border-(--accent) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)"
                      >
                        رجوع
                      </button>
                      <button
                        type="button"
                        onClick={handleNext}
                        className="flex-[1.4] rounded-xl bg-(--accent) px-4 py-3.5 text-sm font-bold text-(--surface) shadow-[0_8px_24px_rgba(0,0,0,0.14)] transition-all hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)"
                      >
                        التالي
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4">
                      <div className="rounded-xl border border-(--line) bg-background p-4">
                        <h3 className="text-sm font-bold text-(--ink)">بيانات العميل</h3>
                        <div className="mt-3 space-y-2 text-sm leading-6 text-(--ink-soft)">
                          <p>الاسم: {customer.name.trim()}</p>
                          <p>الهاتف: {customer.phone.replace(/\s+/g, "")}</p>
                          <p>الاستلام: {customer.fulfillment === "delivery" ? "توصيل" : "من المطعم"}</p>
                          {customer.fulfillment === "delivery" ? (
                            <>
                              <p>العنوان: {customer.address.trim()}</p>
                              {customer.locationUrl ? <p>الموقع: تم تحديده</p> : null}
                            </>
                          ) : null}
                          {customer.notes.trim() ? <p>ملاحظات: {customer.notes.trim()}</p> : null}
                        </div>
                      </div>
                      <div className="rounded-xl border border-(--line) bg-background p-4">
                        <h3 className="text-sm font-bold text-(--ink)">الطلب</h3>
                        <div className="mt-3 space-y-3">
                          {cartGroups.map((group) => (
                            <div key={group.item.id}>
                              <p className="text-sm font-bold text-(--ink)">{group.item.name}</p>
                              {group.lines.map((line) => (
                                <p
                                  key={`${line.item.id}-${line.optionLabel ?? "default"}`}
                                  className="mt-1 text-xs text-(--ink-soft)"
                                >
                                  {line.optionLabel ? `${line.optionLabel} • ` : ""}
                                  {line.quantity} × {line.price} جنيه
                                </p>
                              ))}
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 border-t border-(--line) pt-3 text-sm font-bold text-(--ink)">
                          الإجمالي: {totalPrice} جنيه
                        </div>
                      </div>
                    </div>
                    {error ? (
                      <p className="mt-4 rounded-xl border border-(--accent)/30 bg-(--accent-glow) px-3 py-2.5 text-sm font-semibold leading-6 text-(--ink)">
                        {error}
                      </p>
                    ) : null}
                    <div className="mt-5 flex gap-2">
                      <button
                        type="button"
                        onClick={handleBack}
                        className="flex-1 rounded-xl border border-(--line) px-4 py-3.5 text-sm font-bold text-(--ink) transition-colors hover:border-(--accent) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)"
                      >
                        رجوع
                      </button>
                      <button
                        type="button"
                        onClick={handleWhatsAppOrder}
                        className="flex-[1.6] inline-flex items-center justify-center gap-2 rounded-xl bg-(--accent) px-4 py-3.5 text-sm font-bold text-(--surface) shadow-[0_8px_24px_rgba(0,0,0,0.14)] transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(0,0,0,0.18)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)"
                      >
                        <MessageCircle size={19} aria-hidden="true" />
                        تأكيد وفتح واتساب
                      </button>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
