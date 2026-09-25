import Link from "next/link";
import {
  business,
  services,
  formatPrice,
} from "@/data/service";

const label =
  "text-[11px] font-bold uppercase tracking-[0.22em] text-brick";

export default function ServicesPage() {
  return (
    <main className="bg-cream text-forest">

      {/* INTRO */}
      <section className="px-6 pb-16 pt-32 lg:px-8 lg:pb-24">
        <div className="mx-auto max-w-7xl">

          <p className={label}>
            What we do
          </p>

          <h1 className="mt-5 max-w-5xl font-display text-6xl leading-none md:text-8xl">
            THE RIGHT CUT.
            <br />
            <span className="text-brick">
              YOUR STYLE.
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-7 text-forest/65">
            From classic cuts to modern fades and complete grooming
            experiences, choose your service and we'll take care of the rest.
          </p>

        </div>
      </section>

      {/* SERVICES */}
      <section className="px-6 pb-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 lg:grid-cols-3">

          {services.map((service) => (
            <article
              key={service.id}
              className="group overflow-hidden rounded-btn bg-forest text-cream"
            >

              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={service.image}
                  alt={service.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-6">

                <div className="flex items-start justify-between gap-4">
                  <h2 className="font-display text-2xl">
                    {service.name}
                  </h2>

                  <span className="whitespace-nowrap font-display text-xl text-mustard">
                    {formatPrice(service.price)}
                  </span>
                </div>

                <p className="mt-3 text-sm leading-6 text-cream/60">
                  {service.description}
                </p>

                <div className="mt-6 flex items-center justify-between border-t border-cream/10 pt-4">

                  <span className="text-xs text-cream/50">
                    {service.duration} min
                  </span>

                  <Link
                    href={business.bookingHref}
                    className="text-xs font-bold uppercase tracking-[0.15em] text-mustard"
                  >
                    Book this →
                  </Link>

                </div>

              </div>
            </article>
          ))}

        </div>
      </section>

      {/* CTA */}
      <section className="bg-forest px-6 py-24 text-center text-cream lg:px-8">

        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-mustard">
          Ready?
        </p>

        <h2 className="mt-4 font-display text-4xl md:text-6xl">
          YOUR CHAIR
          <br />
          IS WAITING.
        </h2>

        <Link
          href={business.bookingHref}
          className="mt-8 inline-flex rounded-btn bg-mustard px-8 py-4 text-sm font-bold text-forest"
        >
          BOOK AN APPOINTMENT
        </Link>

      </section>

    </main>
  );
}