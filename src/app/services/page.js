export const dynamic = "force-dynamic";
import Link from "next/link";
import { business, formatPrice } from "@/data/service";
import { getServices } from "@/lib/services";
import { ChevronRight } from "lucide-react";

const label = "text-[11px] font-bold uppercase tracking-[0.22em] text-brick";

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <main className="bg-cream text-forest">
      {/* INTRO */}
      <section className="px-6 pb-16 pt-32 lg:px-8 lg:pb-24">
        <div className="mx-auto max-w-7xl">
          <p className={label}>What we do</p>

          <h1 className="mt-5 max-w-5xl font-display text-6xl leading-none md:text-8xl">
            THE RIGHT CUT.
            <br />
            <span className="text-brick">YOUR STYLE.</span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-7 text-forest/65">
            From classic cuts to modern fades and complete grooming
            experiences, choose your service and we&apos;ll take care of the rest.
          </p>
        </div>
      </section>

      {/* SERVICES */}
      <section className="px-6 pb-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {services.length === 0 ? (
            <p className="text-sm text-forest/60">
              No services available right now. Please check back shortly.
            </p>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {services.map((service) => (
                <article
                  key={service.id}
                  className="overflow-hidden rounded-btn bg-forest text-cream"
                >
                  <div className="group aspect-square overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex h-full flex-col p-5">
                    <div className="flex items-start justify-between gap-3">
                      <h2 className="font-display text-lg">{service.name}</h2>
                      <span className="whitespace-nowrap font-display text-base text-mustard">
                        {formatPrice(service.price)}
                      </span>
                    </div>

                    <p className="mt-2 flex-1 text-xs leading-5 text-cream/60">
                      {service.description}
                    </p>

                    <div className="mt-4 flex items-center justify-between border-t border-cream/10 pt-3">
                      <span className="text-xs text-cream/50">
                        {service.duration} min
                      </span>
                      <Link
                        href={business.bookingHref}
                        className="inline-flex items-center gap-1 whitespace-nowrap text-xs font-bold uppercase tracking-[0.15em] text-mustard"
                      >
                        Book this <ChevronRight size={14} />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
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