import { Share2, Star } from "lucide-react";
import { restaurantConfig } from "@/src/data/restaurant";

export default function Reviews() {
  return (
    <section
      id="reviews"
      aria-label="آراء العملاء"
      className="section-shell scroll-mt-18"
    >
      <div className="content-container py-16 sm:py-20 lg:py-24">
        <div>
          <span className="eyebrow">آراء الناس</span>

          <h2 className="mt-5 text-2xl font-bold text-(--ink) sm:text-3xl">
            الناس قالت إيه عننا؟
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-(--ink-soft) sm:text-base">
            نماذج من آراء العملاء بشكل قريب من السوشيال ميديا
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {restaurantConfig.reviews.map((review) => (
            <article
              key={review.username}
              className="rounded-2xl border border-(--line) bg-(--surface) p-4 sm:p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div
                    className="flex size-10 shrink-0 items-center justify-center rounded-full bg-(--accent-glow) text-sm font-bold text-(--accent)"
                    aria-hidden="true"
                  >
                    {review.initial}
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-bold text-(--ink)">
                      {review.name}
                    </h3>
                    <p className="mt-0.5 truncate text-xs text-(--ink-muted)">
                      {review.username}
                    </p>
                  </div>
                </div>

                <Share2
                  size={18}
                  className="mt-1 shrink-0 text-(--ink-muted)"
                  aria-hidden="true"
                />
              </div>

              <div
                className="mt-4 flex items-center gap-1 text-(--accent)"
                aria-label="تقييم 5 من 5"
              >
                {Array.from({ length: 5 }, (_, index) => (
                  <Star key={index} size={15} fill="currentColor" aria-hidden="true" />
                ))}
              </div>

              <p className="mt-3 text-sm leading-7 text-(--ink-soft)">
                {review.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
