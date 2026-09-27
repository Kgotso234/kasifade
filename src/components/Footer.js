import Link from "next/link";
import Image from "next/image";
import { business, hours } from "@/data/service";

const links = [
  { label: "Home", href: "/" },
  { label: "Our Story", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Barbers", href: "/barbers" },
  // { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

const legal = [
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];

const focus =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mustard";
const linkStyle = `text-sm text-cream/70 transition-colors hover:text-cream ${focus}`;
const heading =
  "mb-5 text-xs font-bold uppercase tracking-[0.18em] text-mustard";
const socialIcon =
  `flex h-9 w-9 items-center justify-center rounded-full border border-cream/25 text-cream/70 transition-colors hover:border-mustard hover:text-mustard ${focus}`;

export default function Footer() {
  return (
    <footer className="border-t border-cream/10 bg-forest-light">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className={`inline-flex items-center gap-3 ${focus}`}>
              <Image
                src="/images/logo.png"
                alt={business.name}
                width={200}
                height={60}
                className="h-14 w-auto object-contain"
                priority
              />
            </Link>
            <p className="mt-6 max-w-md text-sm leading-7 text-cream/70">
              More than a haircut. A lifestyle. Precision, passion, pride —
              your neighbourhood barbershop in {business.area}.
            </p>

            <div className="mt-6 flex gap-3">
              
              <a  href={business.instagramHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className={socialIcon}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
                </svg>
              </a>
              
              <a  href={business.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className={socialIcon}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M21 11.5a8.5 8.5 0 01-12.4 7.55L3 21l2.05-5.4A8.5 8.5 0 1121 11.5z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer">
            <h2 className={heading}>Quick Links</h2>
            <ul className="flex flex-col gap-4">
              {links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkStyle}>
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={business.bookingHref} className={linkStyle}>
                  Book now
                </Link>
              </li>
            </ul>
          </nav>

          {/* Hours + contact */}
          <div>
            <h2 className={heading}>Opening Hours</h2>
            <div className="space-y-1 text-sm leading-6 text-cream/70">
              {hours.map((h) => (
                <p key={h.days}>
                  {h.days}: {h.time}
                </p>
              ))}
            </div>

            <h2 className={`${heading} mt-8`}>Get In Touch</h2>
            <div className="space-y-1 text-sm leading-6 text-cream/70">
              <p>{business.address}</p>
              <p>
                <a href={business.phoneHref} className={linkStyle}>
                  {business.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${business.email}`} className={linkStyle}>
                  {business.email}
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col gap-4 border-t border-cream/10 pt-6 text-xs text-cream/60 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {business.name}. All rights reserved.
          </p>

          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legal.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`transition-colors hover:text-cream ${focus}`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <p className="text-cream/40">Designed with pride.</p>
        </div>
      </div>
    </footer>
  );
}