"use client";

import { useState } from "react";
import { menuCategories, menuItems } from "@/src/data/menu";
import CartSummary from "@/src/components/CartSummary";
import MenuItemCard from "@/src/components/MenuItemCard";

const maxItemsInCategory = Math.max(
  ...menuCategories.map(
    (category) =>
      menuItems.filter((item) => item.category === category.id).length,
  ),
);

const mixedMenuItems = Array.from({ length: maxItemsInCategory }, (_, index) =>
  menuCategories
    .map((category) =>
      menuItems.find(
        (item) =>
          item.category === category.id &&
          menuItems.filter(
            (candidate) => candidate.category === category.id,
          ).indexOf(item) === index,
      ),
    )
    .filter((item): item is (typeof menuItems)[number] => Boolean(item)),
).flat();

const visibleSteps = [6, 20, 40];

const getQuantityKey = (itemId: string, optionLabel?: string) =>
  optionLabel ? `${itemId}::${optionLabel}` : itemId;

export default function Menu() {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({});
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(
    null,
  );
  const [visibleStep, setVisibleStep] = useState(0);

  const getSelectedOptionLabel = (itemId: string) => selectedOptions[itemId];

  const getDefaultOptionLabel = (itemId: string) =>
    menuItems.find((item) => item.id === itemId)?.priceOptions?.[0]?.label;

  const getCurrentOptionLabel = (itemId: string) =>
    getSelectedOptionLabel(itemId) ?? getDefaultOptionLabel(itemId);

  const updateQuantity = (
    itemId: string,
    change: number,
    optionLabel?: string,
  ) => {
    const quantityKey = getQuantityKey(itemId, optionLabel);

    setQuantities((current) => {
      const nextQuantity = Math.max(0, (current[quantityKey] ?? 0) + change);

      return {
        ...current,
        [quantityKey]: nextQuantity,
      };
    });
  };

  const selectOption = (itemId: string, label: string) => {
    setSelectedOptions((current) => ({
      ...current,
      [itemId]: label,
    }));
  };

  const handleClearCart = () => {
    setQuantities({});
    setSelectedOptions({});
  };

  const activeCategory = menuCategories.find(
    (category) => category.id === activeCategoryId,
  );

  const filteredItems = activeCategoryId
    ? menuItems.filter((item) => item.category === activeCategoryId)
    : mixedMenuItems;

  const visibleCount = visibleSteps[visibleStep] ?? filteredItems.length;

  const hasMoreItems =
    !activeCategoryId && visibleCount < filteredItems.length;

  const visibleItems = activeCategoryId
    ? filteredItems
    : filteredItems.slice(0, visibleCount);

  const handleCategoryChange = (categoryId: string) => {
    setVisibleStep(0);
    setActiveCategoryId((current) =>
      current === categoryId ? null : categoryId,
    );
  };

  const handleShowMore = () => {
    setVisibleStep((current) => current + 1);
  };

  return (
    <section
      id="menu"
      aria-label="المنيو"
      className="section-shell scroll-mt-18"
    >
      <div className="content-container py-16 sm:py-20 lg:py-24">
        <div>
          <span className="eyebrow">المنيو</span>

          <h2 className="mt-5 text-2xl font-bold text-(--ink) sm:text-3xl">
            اختار اللي نفسك فيه
          </h2>

          <p className="mt-3 max-w-xl text-sm leading-7 text-(--ink-soft) sm:text-base">
            كل اللي بتحبه موجود عندنا، اختار القسم وشوف الأصناف.
          </p>
        </div>

        <div
          className="menu-category-tabs mt-8 flex gap-2 overflow-x-auto pb-2"
          role="tablist"
          aria-label="أقسام المنيو"
        >
          {menuCategories.map((category) => {
            const isActive = category.id === activeCategoryId;

            return (
              <button
                key={category.id}
                type="button"
                id={`menu-tab-${category.id}`}
                role="tab"
                aria-selected={isActive}
                aria-controls={`menu-panel-${category.id}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => handleCategoryChange(category.id)}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent) ${
                  isActive
                    ? "border-(--accent) bg-(--accent) text-foreground"
                    : "border-(--line) bg-(--surface) text-(--ink-soft) hover:border-(--accent) hover:text-(--ink)"
                }`}
              >
                {category.name}
              </button>
            );
          })}
        </div>

        <div
          className="mt-8"
          id={
            activeCategoryId
              ? `menu-panel-${activeCategoryId}`
              : "menu-panel-all"
          }
          role="tabpanel"
          aria-labelledby={
            activeCategoryId
              ? `menu-tab-${activeCategoryId}`
              : undefined
          }
          aria-label={activeCategory?.name ?? "كل الأصناف"}
        >
          <div className="grid gap-4">
            {visibleItems.map((item) => {
              const selectedOptionLabel = getCurrentOptionLabel(item.id);
              const quantity =
                quantities[
                  getQuantityKey(item.id, selectedOptionLabel)
                ] ?? 0;

              return (
                <MenuItemCard
                  key={item.id}
                  item={item}
                  quantity={quantity}
                  selectedOptionLabel={selectedOptionLabel}
                  onSelectOption={(label) => selectOption(item.id, label)}
                  onAdd={() =>
                    updateQuantity(item.id, 1, selectedOptionLabel)
                  }
                  onDecrease={() =>
                    updateQuantity(item.id, -1, selectedOptionLabel)
                  }
                  onIncrease={() =>
                    updateQuantity(item.id, 1, selectedOptionLabel)
                  }
                />
              );
            })}
          </div>

          {hasMoreItems ? (
            <div className="mt-6 flex justify-center">
              <button
                type="button"
                onClick={handleShowMore}
                className="rounded-full border border-(--line) bg-(--surface) px-5 py-2.5 text-sm font-semibold text-(--ink) transition-colors hover:border-(--accent) hover:text-(--accent) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)"
              >
                عرض المزيد
              </button>
            </div>
          ) : null}
        </div>
      </div>

      <CartSummary
        items={menuItems}
        quantities={quantities}
        onDecrease={(itemId, optionLabel) =>
          updateQuantity(itemId, -1, optionLabel)
        }
        onIncrease={(itemId, optionLabel) =>
          updateQuantity(itemId, 1, optionLabel)
        }
        onClear={handleClearCart}
      />
    </section>
  );
}