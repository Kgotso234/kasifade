import {
  contact,
  hours,
  business,
} from "@/data/service";

const label =
  "text-[11px] font-bold uppercase tracking-[0.22em] text-brick";

export default function ContactPage() {
  return (
    <main className="bg-cream text-forest">

      {/* HEADER */}
      <section className="px-6 pb-16 pt-32 lg:px-8 lg:pb-24">

        <div className="mx-auto max-w-7xl">

          <p className={label}>
            Get in touch
          </p>

          <h1 className="mt-5 font-display text-6xl leading-none md:text-8xl">
            {contact.title}
          </h1>

          <p className="mt-7 max-w-xl text-base leading-7 text-forest/60">
            {contact.description}
          </p>

        </div>

      </section>

      {/* CONTACT DETAILS */}
      <section className="px-6 pb-24 lg:px-8">

        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-2">

          {/* CONTACT */}
          <div className="rounded-btn bg-forest p-8 text-cream md:p-10">

            <h2 className="font-display text-3xl">
              TALK TO US.
            </h2>

            <div className="mt-10 space-y-7">

              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-mustard">
                  Call
                </p>

                <a
                  href={contact.phoneHref}
                  className="mt-2 block text-lg hover:text-mustard"
                >
                  {contact.phone}
                </a>
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-mustard">
                  WhatsApp
                </p>

                <a
                  href={contact.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 block text-lg hover:text-mustard"
                >
                  Start a conversation →
                </a>
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-mustard">
                  Email
                </p>

                <a
                  href={`mailto:${contact.email}`}
                  className="mt-2 block text-lg hover:text-mustard"
                >
                  {contact.email}
                </a>
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-mustard">
                  Instagram
                </p>

                <a
                  href={contact.instagramHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 block text-lg hover:text-mustard"
                >
                  @kasifade →
                </a>
              </div>

            </div>

          </div>

          {/* LOCATION */}
          <div className="rounded-btn border border-forest/15 p-8 md:p-10">

            <h2 className="font-display text-3xl">
              FIND US.
            </h2>

            <p className="mt-7 text-base leading-7 text-forest/65">
              {contact.address}
            </p>

            <div className="mt-8 border-t border-forest/10 pt-6">

              <p className="text-[10px] font-bold uppercase tracking-wider text-brick">
                Opening hours
              </p>

              <div className="mt-5 space-y-3">

                {hours.map((item) => (
                  <div
                    key={item.days}
                    className="flex justify-between border-b border-forest/10 pb-3 text-sm"
                  >
                    <span className="font-semibold">
                      {item.days}
                    </span>

                    <span className="text-forest/55">
                      {item.time}
                    </span>
                  </div>
                ))}

              </div>

            </div>

            <a
              href={contact.mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex rounded-btn bg-mustard px-8 py-4 text-sm font-bold text-forest"
            >
              GET DIRECTIONS
            </a>

          </div>

        </div>

      </section>

      {/* MAP / VISUAL */}
      <section className="px-6 pb-24 lg:px-8">

        <div className="mx-auto max-w-7xl">

          <div className="relative aspect-[16/7] overflow-hidden rounded-btn bg-forest">

            <img
              src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=1800&q=85"
              alt="Barbershop interior"
              className="h-full w-full object-cover opacity-70"
            />

            <div className="absolute inset-0 flex items-center justify-center bg-forest/30">

              <a
                href={business.mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-btn bg-mustard px-7 py-4 text-sm font-bold text-forest"
              >
                OPEN IN GOOGLE MAPS
              </a>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}