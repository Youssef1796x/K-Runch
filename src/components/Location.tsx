import { Clock3, MapPin, Phone, MessageCircle, Contact } from "lucide-react";
import { restaurantConfig } from "@/src/data/restaurant";

export default function Location() {
  return (
    <section
      id="location"
      aria-label="الموقع والتواصل"
      className="section-shell scroll-mt-18"
    >
      <div className="content-container py-16 sm:py-20 lg:py-24">
        <div className="max-w-5xl">
          <span className="eyebrow">موقعنا</span>

          <div className="mt-5">
            <h2 className="text-2xl font-bold text-(--ink) sm:text-3xl">
              {restaurantConfig.location.heading}
            </h2>

            <p className="mt-4 text-sm leading-7 text-(--ink-soft) sm:text-base">
              {restaurantConfig.location.body}
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              <div className="rounded-2xl border border-(--line) bg-(--surface) p-4">
                <div className="flex items-start gap-3">
                  <MapPin
                    size={18}
                    className="shrink-0 text-(--accent)"
                    aria-hidden="true"
                  />

                  <div>
                    <p className="text-xs text-(--ink-muted)">العنوان</p>

                    <p className="mt-2 text-sm font-semibold text-(--ink)">
                      {restaurantConfig.location.address}
                    </p>

                    <a
                      href={restaurantConfig.location.mapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 inline-block text-xs font-bold text-(--accent) hover:underline"
                    >
                      شوف المكان على الخريطة
                    </a>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-(--line) bg-(--surface) p-4">
                <div className="flex items-start gap-3">
                  <Clock3
                    size={18}
                    className="shrink-0 text-(--accent)"
                    aria-hidden="true"
                  />

                  <div>
                    <p className="text-xs text-(--ink-muted)">مواعيدنا</p>

                    <p className="mt-2 text-sm font-semibold text-(--ink)">
                      {restaurantConfig.location.hours}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-(--line) bg-(--surface) p-4">
                <div className="flex items-start gap-3">
                  <Contact
                    size={18}
                    className="shrink-0 text-(--accent)"
                    aria-hidden="true"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-(--ink-muted)">التواصل</p>

                    <div className="mt-3 grid grid-cols-2 gap-3">
                      <a
                        href={`tel:${restaurantConfig.location.phone}`}
                        className="min-w-0 text-sm font-semibold text-(--ink) hover:text-(--accent)"
                      >
                        <span className="flex items-center gap-1.5 text-xs text-(--ink-muted)">
                          <Phone size={14} aria-hidden="true" />
                          اتصل بنا
                        </span>

                        <span className="mt-1 block truncate">
                          {restaurantConfig.location.phone}
                        </span>
                      </a>

                      <a
                        href={`https://wa.me/20${restaurantConfig.location.whatsapp.slice(1)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="min-w-0 text-sm font-semibold text-(--ink) hover:text-(--accent)"
                      >
                        <span className="flex items-center gap-1.5 text-xs text-(--ink-muted)">
                          <MessageCircle size={14} aria-hidden="true" />
                          واتساب
                        </span>

                        <span className="mt-1 block truncate">
                          {restaurantConfig.location.whatsapp}
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
