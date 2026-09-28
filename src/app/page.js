"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  business,
  hours,
  barbers,
  formatPrice,
  startingPrice,
} from "@/data/service";

const label = "text-[11px] font-bold uppercase tracking-[0.22em] text-mustard";
const h2 = "mt-4 font-display text-3xl leading-tight md:text-5xl";
const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-btn bg-mustard px-7 py-4 text-center text-sm font-bold tracking-wide text-forest transition-colors hover:bg-mustard-hover";
const btnGhost =
  "inline-flex items-center justify-center gap-2 rounded-btn border border-cream/40 px-7 py-4 text-center text-sm font-bold tracking-wide transition-colors hover:border-mustard hover:text-mustard";
const arrowBtn =
  "flex h-10 w-10 items-center justify-center rounded-full border border-mustard/50 text-mustard transition-colors hover:bg-mustard hover:text-forest";

function Carousel({ children, interval = 3500 }) {
  const trackRef = useRef(null);
  const pausedRef = useRef(false);

  const scrollBy = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.firstElementChild;
    const step = card ? card.offsetWidth + 16 : 320; // 16 = gap-4
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  // Auto-advance left → right, then loop back to the start
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = setInterval(() => {
      const el = trackRef.current;
      if (!el || pausedRef.current) return;

      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
      if (atEnd) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        const card = el.firstElementChild;
        const step = card ? card.offsetWidth + 16 : 320;
        el.scrollBy({ left: step, behavior: "smooth" });
      }
    }, interval);

    return () => clearInterval(id);
  }, [interval]);

  const pause = () => (pausedRef.current = true);
  const resume = () => (pausedRef.current = false);

  return (
    <div
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocus={pause}
      onBlur={resume}
      onTouchStart={pause}
      onTouchEnd={() => setTimeout(resume, 4000)}
    >
      <div className="mb-4 hidden justify-end gap-3 sm:flex">
        <button type="button" onClick={() => scrollBy(-1)} className={arrowBtn} aria-label="Scroll left">
          <ChevronLeft size={16} />
        </button>
        <button type="button" onClick={() => scrollBy(1)} className={arrowBtn} aria-label="Scroll right">
          <ChevronRight size={16} />
        </button>
      </div>
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>
    </div>
  );
}

export default function Home() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("/api/services")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setServices(data.services);
      })
      .catch((err) => console.error("Failed to load services:", err));
  }, []);

  return (
    <div>
      {/* 1. HERO */}
      <section id="home" className="relative flex min-h-[90svh] items-end overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=1800&q=90"
          alt="Barber giving a precision haircut"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/60 to-forest/30" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 pt-32 lg:px-8 lg:pb-20">
          <p className={label}>More than a cut.</p>
          <h1 className="mt-5 font-display text-6xl leading-none md:text-8xl lg:text-9xl">
            {business.shortName.toUpperCase()}
            <br />
            <span className="text-mustard">{business.area.toUpperCase()}</span>
          </h1>
          <p className="mt-6 max-w-md text-lg leading-8 text-cream/90">
            Precision cuts. Clean fades. Good vibes. This is where style meets pride.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href={business.bookingHref} className={btnPrimary}>
              BOOK AN APPOINTMENT
            </Link>
            <Link href="#services" className={btnGhost}>
              OUR SERVICES
              <ChevronRight size={16} />
            </Link>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-2 border-t border-cream/20 pt-5 text-xs font-medium text-cream/80">
            <li>Open 7 days</li>
            <li>Walk-ins welcome</li>
            <li>Cuts from {formatPrice(startingPrice)}</li>
          </ul>
        </div>
      </section>

      {/* 2. SERVICES */}
      <section id="services" className="bg-cream px-6 py-24 text-forest lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className={`${label} !text-brick`}>Our services</p>
              <h2 className={h2}>CUTS WITH A STORY</h2>
            </div>
            <p className="max-w-sm text-sm leading-7 text-forest/70">
              From classic cuts to modern styles, we deliver the perfect
              look every time.
            </p>
          </div>

          <div className="mt-10">
            {services.length === 0 ? (
              <p className="text-sm text-forest/60">Loading services…</p>
            ) : (
              <Carousel>
                {services.map(({ id, name, description, price, image }) => (
                  <Link
                    key={id}
                    href={business.bookingHref}
                    className="group w-64 flex-shrink-0 snap-start overflow-hidden rounded-btn border border-forest/15 bg-forest text-cream transition-transform hover:-translate-y-1"
                  >
                    {/* Placeholder image block */}
                    <div className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-forest-light to-forest">
                      {/* <span className="font-display text-4xl text-cream/20">
                        {image}
                      </span> */}
                      <img
                        src={image}
                        alt={`${name}`}
                        className="h-[250px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="font-display text-lg">{name}</h3>
                      <p className="mt-1 text-xs text-cream/60">{description}</p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="font-display text-lg text-mustard">
                          {formatPrice(price)}
                        </span>
                        <span className="text-mustard transition-transform group-hover:translate-x-1">
                          <ChevronRight size={16} />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </Carousel>
            )}
          </div>
        </div>
      </section>

      {/* 3. BARBERS */}
      <section id="barbers" className="px-6 py-24 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className={label}>Our barbers</p>
              <h2 className={h2}>THE HANDS BEHIND THE CUT</h2>
            </div>
          </div>

          <div className="mt-10">
            <Carousel>
              {barbers.map((b) => (
                <div
                  key={b.id}
                  className="group relative aspect-[3/4] w-64 flex-shrink-0 snap-start overflow-hidden rounded-btn bg-forest-light"
                >
                  <img
                    src={b.image}
                    alt={`${b.name}, barber`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest via-forest/70 to-transparent p-5 pt-14">
                    <h3 className="font-display text-lg leading-none text-cream">
                      {b.name}
                    </h3>
                    <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.15em] text-mustard">
                      {b.role}
                    </p>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </section>

      {/* 4. THE VIBE */}
      <section className="bg-forest-light px-6 py-24 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="font-display text-3xl leading-tight md:text-6xl">
            MUSIC. BANTER. <span className="text-mustard">COME AS YOU ARE.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-cream/70">
            It&apos;s not just a haircut. It&apos;s a vibe.
          </p>
          <Link href={business.bookingHref} className={`${btnPrimary} mt-8`}>
            BOOK YOUR SEAT
          </Link>
        </div>
      </section>

      {/* 5. BOOK + FIND US */}
      <section id="find-us" className="px-6 py-24 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
          <div className="rounded-btn border border-cream/15 p-8">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-mustard">
              <path d="M6 10V7a3 3 0 013-3h6a3 3 0 013 3v3M5 10h14l-1 8a2 2 0 01-2 2H8a2 2 0 01-2-2l-1-8zM9 14h6" />
            </svg>
            <h3 className="mt-4 font-display text-2xl">
              YOUR CHAIR IS
              <br />
              WAITING
            </h3>
            <p className="mt-3 text-sm leading-6 text-cream/70">
              Book your slot and skip the wait. Walk-ins welcome.
            </p>
            <Link href={business.bookingHref} className={`${btnPrimary} mt-6`}>
              BOOK NOW
            </Link>
          </div>

          <div className="rounded-btn border border-cream/15 p-8">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-mustard">
              <path d="M12 21s7-6.5 7-11.5A7 7 0 105 9.5C5 14.5 12 21 12 21z" />
              <circle cx="12" cy="9.5" r="2.5" />
            </svg>
            <h3 className="mt-4 font-display text-2xl">
              FIND US IN
              <br />
              {business.area.toUpperCase()}
            </h3>
            <p className="mt-3 text-sm leading-6 text-cream/70">
              {business.address}
              <br />
              {hours[0].days}: {hours[0].time}
            </p>
            
            <a  href={business.mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className={`${btnGhost} mt-6`}
            >
              GET DIRECTIONS
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}