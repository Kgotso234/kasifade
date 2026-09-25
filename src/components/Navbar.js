"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { business } from "@/data/service";

const links = [
  { label: "Home", href: "/" },
  { label: "Our Story", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Barbers", href: "/barbers" },
  // { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

const focus =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mustard";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const solid = pathname !== "/" || scrolled || menuOpen;
  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-colors duration-300 ${
        solid
          ? "border-b border-cream/10 bg-forest/95 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link href="/" className={`flex items-center mt-4 gap-3 ${focus}`}>
          <Image
            src="/images/logo.png"
            alt={business.name}
            width={200}
            height={100}
            className="h-50 w-auto object-contain md:h-50"
            priority
          />
          {/* <div className="leading-none">
            <div className="font-display text-lg tracking-wider">
              {business.shortName.toUpperCase()}
            </div>
            <div className="mt-1 text-[10px] font-semibold tracking-[0.3em] text-cream/70">
              {business.area.toUpperCase()}
            </div>
          </div> */}
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {links.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`border-b-2 py-1 text-sm font-medium transition-colors hover:text-mustard ${focus} ${
                  active
                    ? "border-mustard text-mustard"
                    : "border-transparent text-cream/80"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href={business.bookingHref}
          className={`hidden rounded-btn bg-mustard px-6 py-3 text-xs font-bold tracking-[0.12em] text-forest transition-colors hover:bg-mustard-hover sm:block ${focus}`}
        >
          BOOK NOW
        </Link>

        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className={`flex h-10 w-10 items-center justify-center rounded-btn border border-cream/30 lg:hidden ${focus}`}
        >
          <svg
            aria-hidden="true"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="square"
          >
            {menuOpen ? (
              <path d="M5 5l14 14M19 5L5 19" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="border-t border-cream/10 bg-forest px-6 py-6 lg:hidden"
        >
          <nav aria-label="Mobile" className="flex flex-col">
            {links.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`border-b border-cream/10 py-4 text-sm font-medium ${focus} ${
                    active ? "text-mustard" : "text-cream"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href={business.bookingHref}
              onClick={() => setMenuOpen(false)}
              className={`mt-5 rounded-btn bg-mustard px-6 py-4 text-center text-xs font-bold tracking-[0.12em] text-forest ${focus}`}
            >
              BOOK NOW
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}