"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function WelcomePopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const closePopup = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
      onClick={closePopup}
    >
      <div
        className="relative w-full max-w-md overflow-hidden rounded-2xl bg-cream shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={closePopup}
          aria-label="Close popup"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-forest/90 text-cream transition hover:bg-mustard hover:text-forest"
        >
          <span className="text-xl leading-none">×</span>
        </button>

        {/* Image */}
        <div className="relative h-56 w-full">
          <Image
            src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=1000&q=85"
            alt="Kasifade barber at work"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 448px"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-transparent to-transparent" />

          <div className="absolute bottom-4 left-5">
            <span className="rounded-full bg-mustard px-3 py-1 text-xs font-bold uppercase tracking-wider text-forest">
              Kasifade
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-7 text-center sm:px-8">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-mustard">
            Welcome to Kasifade
          </p>

          <h2 className="font-display text-2xl uppercase leading-tight text-forest sm:text-3xl">
            Fresh Cut. Fresh Energy.
          </h2>

          <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-forest/70">
            New to the chair? Book your first Kasifade session and experience
            sharp cuts, clean finishes and good energy.
          </p>

          <Link
            href="/booking"
            onClick={closePopup}
            className="mt-6 flex w-full items-center justify-center rounded-xl bg-forest px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-cream transition hover:bg-mustard hover:text-forest"
          >
            Book My Appointment
          </Link>

          <button
            type="button"
            onClick={closePopup}
            className="mt-4 text-sm font-medium text-forest/60 transition hover:text-forest"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}