import Link from "next/link";
import { business } from "@/data/service";
import { getBarbers } from "@/lib/barbers";

const label = "text-[11px] font-bold uppercase tracking-[0.22em] text-mustard";

export default async function BarbersPage() {
  const barbers = await getBarbers();

  return (
    <main className="bg-forest text-cream">
      {/* INTRO */}
      <section className="px-6 pb-16 pt-32 lg:px-8 lg:pb-24">
        <div className="mx-auto max-w-7xl">
          <p className={label}>The team</p>

          <h1 className="mt-5 max-w-5xl font-display text-6xl leading-none md:text-8xl">
            THE HANDS
            <br />
            <span className="text-mustard">BEHIND THE CUT.</span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-7 text-cream/60">
            Different styles. Different specialties.
            One Kasifade standard.
          </p>
        </div>
      </section>

      {/* BARBERS */}
      <section className="px-6 pb-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {barbers.length === 0 ? (
            <p className="text-sm text-cream/60">
              No barbers available right now. Please check back shortly.
            </p>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {barbers.map((barber) => (
                <article key={barber.id}>
                  <div className="group aspect-[3/4] overflow-hidden rounded-btn bg-forest-light">
                    <img
                      src={barber.image}
                      alt={`${barber.name}, ${barber.role}`}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  <div className="pt-6">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-mustard">
                      {barber.role}
                    </p>

                    <h2 className="mt-2 font-display text-3xl">
                      {barber.name}
                    </h2>

                    <p className="mt-2 text-sm text-cream/50">
                      {barber.specialty}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-forest-light px-6 py-24 text-center">
        <h2 className="font-display text-4xl md:text-6xl">
          FIND YOUR
          <br />
          <span className="text-mustard">BARBER.</span>
        </h2>

        <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-cream/60">
          Choose your service during booking and we&apos;ll show you
          the barbers available for it.
        </p>

        <Link
          href={business.bookingHref}
          className="mt-8 inline-flex rounded-btn bg-mustard px-8 py-4 text-sm font-bold text-forest"
        >
          START BOOKING
        </Link>
      </section>
    </main>
  );
}