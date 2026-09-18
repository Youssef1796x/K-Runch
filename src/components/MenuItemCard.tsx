"use client";

import Image from "next/image";
import { Maximize2, X } from "lucide-react";
import { useState } from "react";
import type { MenuItem } from "@/src/data/menu";
import { menuItemImages } from "@/src/data/menuImages";

type MenuItemCardProps = {
  item: MenuItem;
  quantity: number;
  selectedOptionLabel?: string;
  onSelectOption: (label: string) => void;
  onAdd: () => void;
  onDecrease: () => void;
  onIncrease: () => void;
};

export default function MenuItemCard({
  item,
  quantity,
  selectedOptionLabel,
  onSelectOption,
  onAdd,
  onDecrease,
  onIncrease,
}: MenuItemCardProps) {
  const [isImageOpen, setIsImageOpen] = useState(false);

  const selectedOption = item.priceOptions?.find(
    (option) => option.label === selectedOptionLabel,
  );
  const currentPrice = item.price ?? selectedOption?.price;
  const imageSrc = item.image || menuItemImages[item.id] || "";
  const displayName = item.id === "honey-moon" ? "شهر العسل" : item.name;
  const isExternalImage = /^https?:\/\//.test(imageSrc);

  return (
    <article className="flex w-full overflow-hidden rounded-2xl border border-(--line) bg-(--surface) p-2.5 sm:p-3">
      <div className="relative size-24 shrink-0 overflow-hidden rounded-xl border border-(--line-soft) bg-(--surface-tint) sm:size-28">
        {imageSrc ? (
          <>
            <Image
              src={imageSrc}
              alt={displayName}
              fill
              sizes="(min-width: 640px) 112px, 96px"
              quality={60}
              unoptimized={isExternalImage}
              className="object-cover"
            />
            <button
              type="button"
              onClick={() => setIsImageOpen(true)}
              aria-label={`تكبير صورة ${displayName}`}
              className="absolute bottom-1.5 inset-s-1.5 inline-flex size-8 items-center justify-center rounded-lg border border-white/15 bg-black/65 text-white shadow-sm transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)"
            >
              <Maximize2 size={14} aria-hidden="true" />
            </button>
          </>
        ) : null}
      </div>

      <div className="min-w-0 flex-1 px-3 py-1 sm:px-4">
        <div className="min-w-0">
          <h3 className="text-base font-bold leading-6 text-(--ink)">{displayName}</h3>
          {item.description ? (
            <p className="mt-1.5 text-sm leading-6 text-(--ink-soft)">
              {item.description}
            </p>
          ) : null}
        </div>

        {item.priceOptions?.length ? (
          <div className="mt-3 flex flex-wrap gap-1.5" aria-label={`اختار حجم ${displayName}`}>
            {item.priceOptions.map((option) => {
              const isSelected = option.label === selectedOptionLabel;

              return (
                <button
                  key={option.label}
                  type="button"
                  onClick={() => onSelectOption(option.label)}
                  aria-pressed={isSelected}
                  className={`rounded-md border px-3 py-1.5 text-xs font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent) ${
                    isSelected
                      ? "border-(--accent) bg-(--accent) text-black"
                      : "border-(--line) bg-background text-(--ink-soft) hover:border-(--accent) hover:text-(--ink)"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        ) : null}

        <div className="mt-2.5 grid grid-cols-[minmax(0,1fr)_96px] items-center gap-3 sm:grid-cols-[minmax(0,1fr)_104px]">
          <span className="min-w-0 text-base font-extrabold leading-6 text-(--accent)">
            {currentPrice !== undefined ? `${currentPrice} جنيه` : "السعر غير محدد"}
          </span>

          <div className="w-full">
            {!item.available ? (
              <span className="block text-center text-sm font-semibold text-(--ink-muted)">
                غير متاح حاليًا
              </span>
            ) : quantity === 0 ? (
              <button
                type="button"
                onClick={onAdd}
                className="inline-flex min-h-10 w-full items-center justify-center rounded-lg bg-(--accent) px-3 py-2 text-sm font-bold text-black transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)"
              >
                عايز ده +
              </button>
            ) : (
              <div className="flex h-10 w-full items-center rounded-lg border border-(--line) bg-background p-1">
                <button
                  type="button"
                  aria-label={`زود ${displayName}`}
                  onClick={onIncrease}
                  className="flex size-8 shrink-0 items-center justify-center rounded-md text-lg font-bold text-(--ink) transition-colors hover:bg-(--accent-glow) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)"
                >
                  +
                </button>

                <span className="min-w-0 flex-1 text-center text-sm font-bold text-(--ink)">
                  {quantity}
                </span>

                <button
                  type="button"
                  aria-label={`قلل ${displayName}`}
                  onClick={onDecrease}
                  className="flex size-8 shrink-0 items-center justify-center rounded-md text-lg font-bold text-(--ink) transition-colors hover:bg-(--accent-glow) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)"
                >
                  −
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {isImageOpen && imageSrc ? (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`صورة ${displayName}`}
          onClick={() => setIsImageOpen(false)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-2xl bg-(--surface)"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsImageOpen(false)}
              aria-label="إغلاق الصورة"
              className="absolute inset-e-3 top-3 z-10 inline-flex size-10 items-center justify-center rounded-full bg-black/70 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)"
            >
              <X size={18} aria-hidden="true" />
            </button>

            <div className="relative h-[70vh] max-h-175 w-full">
              <Image
                src={imageSrc}
                alt={displayName}
                fill
                sizes="(min-width: 768px) 672px, calc(100vw - 32px)"
                quality={65}
                unoptimized={isExternalImage}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      ) : null}
    </article>
  );
}
