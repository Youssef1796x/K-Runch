import Image from "next/image";
import { restaurantConfig } from "@/src/data/restaurant";

export default function Hero() {
  return (
    <section
      id="hero"
      aria-label="القسم الرئيسي"
      className="section-shell hero-section"
    >
      <div className="content-container grid items-center gap-8 py-10 sm:gap-10 sm:py-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14 lg:py-18">
        <div className="order-2 lg:order-1">
          <span className="eyebrow">{restaurantConfig.name}</span>

          <div className="mt-4 max-w-md border-r-4 border-(--accent) pr-4">
            <h1 className="text-2xl font-bold leading-tight text-(--ink) sm:text-3xl">
              {restaurantConfig.hero.heading}
            </h1>

            <p className="mt-3 text-sm leading-7 text-(--ink-soft) sm:text-base">
              {restaurantConfig.hero.body}
            </p>

            <a
              href="#menu"
              className="mt-5 inline-flex items-center justify-center rounded-xl bg-(--accent) px-6 py-3 text-sm font-bold text-black shadow-sm transition-all hover:-translate-y-0.5 hover:opacity-90"
            >
              {restaurantConfig.hero.cta}
            </a>
          </div>
        </div>

        <div className="order-1 mx-auto w-full max-w-140 overflow-hidden rounded-[28px] border-3 border-[#e8c75a45] lg:order-2">
          <Image
            src={restaurantConfig.banner}
            alt={`بانر مطعم ${restaurantConfig.name}`}
            width={1600}
            height={900}
            priority
            className="h-auto w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}