import Link from "next/link";
import {
  business,
  story,
} from "@/data/service";

const label =
  "text-[11px] font-bold uppercase tracking-[0.22em] text-mustard";

export default function OurStoryPage() {
  return (
    <main className="bg-forest text-cream">

      {/* HERO */}
      <section className="px-6 pb-12 pt-32 lg:px-8 lg:pb-16">

        <div className="mx-auto max-w-7xl">

          <p className={label}>
            {story.eyebrow}
          </p>

          <h1 className="mt-5 max-w-6xl font-display text-6xl leading-[0.9] md:text-8xl lg:text-[9rem]">
            {story.title}
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-cream/70">
            {story.intro}
          </p>

        </div>

      </section>

      {/* HERO IMAGE */}
      <section className="px-6 lg:px-8">

        <div className="mx-auto max-w-7xl">

          <div className="aspect-[16/8] overflow-hidden rounded-btn">
            <img
              src={story.images.hero}
              alt="Kasifade barbershop atmosphere"
              className="h-full w-full object-cover"
            />
          </div>

        </div>

      </section>

      {/* STORY */}
      <section className="px-6 py-24 lg:px-8 lg:py-32">

        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.8fr_1.2fr]">

          <div>
            <p className={label}>
              Where it started
            </p>

            <h2 className="mt-5 font-display text-4xl leading-tight md:text-6xl">
              MORE THAN
              <br />
              A HAIRCUT.
            </h2>
          </div>

          <div className="space-y-7 text-base leading-8 text-cream/70">

            {story.paragraphs.map((paragraph) => (
              <p key={paragraph}>
                {paragraph}
              </p>
            ))}

          </div>

        </div>

      </section>

      {/* IMAGE COLLAGE */}
      <section className="px-6 pb-24 lg:px-8 lg:pb-32">

        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-[1.25fr_0.75fr]">

          <div className="aspect-[4/3] overflow-hidden rounded-btn">
            <img
              src={story.images.interior}
              alt="Barbershop interior"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="grid gap-4">

            <div className="aspect-[4/3] overflow-hidden rounded-btn">
              <img
                src={story.images.barber}
                alt="Barber working"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="aspect-[4/3] overflow-hidden rounded-btn">
              <img
                src={story.images.detail}
                alt="Barber finishing a haircut"
                className="h-full w-full object-cover"
              />
            </div>

          </div>

        </div>

      </section>

      {/* TIMELINE */}
      <section className="bg-cream px-6 py-24 text-forest lg:px-8 lg:py-32">

        <div className="mx-auto max-w-7xl">

          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brick">
            The journey
          </p>

          <div className="mt-12">

            {story.milestones.map((milestone, index) => (
              <div
                key={milestone.year}
                className="grid gap-5 border-t border-forest/15 py-8 md:grid-cols-[180px_1fr_1.5fr]"
              >

                <span className="font-display text-3xl text-brick">
                  {milestone.year}
                </span>

                <h3 className="font-display text-2xl">
                  {milestone.title}
                </h3>

                <p className="max-w-md text-sm leading-7 text-forest/60">
                  {milestone.text}
                </p>

              </div>
            ))}

          </div>

        </div>

      </section>

      {/* FINAL CTA */}
      <section className="px-6 py-24 text-center lg:px-8 lg:py-32">

        <p className={label}>
          {business.area}
        </p>

        <h2 className="mx-auto mt-5 max-w-4xl font-display text-5xl leading-none md:text-7xl">
          THE STORY
          <br />
          <span className="text-mustard">
            CONTINUES WITH YOU.
          </span>
        </h2>

        <Link
          href={business.bookingHref}
          className="mt-9 inline-flex rounded-btn bg-mustard px-8 py-4 text-sm font-bold text-forest"
        >
          BOOK YOUR CHAIR
        </Link>

      </section>

    </main>
  );
}