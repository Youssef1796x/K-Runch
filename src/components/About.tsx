import Image from "next/image";
import { Globe } from "lucide-react";
import { restaurantConfig } from "@/src/data/restaurant";

export default function About() {
  return (
    <section
      id="about"
      aria-label="عن المطعم"
      className="section-shell scroll-mt-18"
    >
      <div className="content-container py-16 sm:py-20 lg:py-24">
        <div className="max-w-2xl">
          <span className="eyebrow">عن المطعم</span>

          <div className="mt-5">
            <Image
              src={restaurantConfig.logo}
              alt={`لوجو ${restaurantConfig.name}`}
              width={96}
              height={96}
              className="h-32 w-32 rounded-2xl border-3 border-(--accent-border) object-cover"
            />
          </div>

          <h2 className="mt-5 text-2xl font-bold text-(--ink) sm:text-3xl">
            {restaurantConfig.about.heading}
          </h2>

          <p className="mt-4 text-sm leading-7 text-(--ink-soft) sm:text-base">
            {restaurantConfig.about.body}
          </p>

          <a
            href={restaurantConfig.socials.facebook}
            target="_blank"
            rel="noreferrer"
            aria-label="صفحتنا على فيسبوك"
            className="mt-5 inline-flex items-center justify-center gap-2 rounded-full border-2 border-(--line) px-4 py-2.5 font-bold text-(--ink-soft) transition hover:border-(--accent) hover:text-(--accent)"
          >
            <span>زور صفحتنا على فيسبوك</span>
            <Globe size={18} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
