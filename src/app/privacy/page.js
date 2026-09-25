export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-cream text-forest">
      {/* Header */}
      <section className="border-b border-forest/10 px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-5xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-mustard">
            Legal
          </p>

          <h1 className="mt-4 max-w-4xl font-display text-4xl leading-[0.95] md:text-7xl">
            PRIVACY POLICY
          </h1>

          <p className="mt-6 max-w-2xl text-sm leading-7 text-forest/70 md:text-base">
            Your privacy matters to us. This Privacy Policy explains how
            Kasifade Barbershop may collect, use and protect your personal
            information when you use our website or interact with our
            services.
          </p>

          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.15em] text-forest/50">
            Last updated: September 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-4xl space-y-12">

          <LegalSection title="1. Who we are">
            <p>
              Kasifade Barbershop is a barbershop based in Tembisa, Gauteng.
              This Privacy Policy applies to information collected through our
              website, booking process and other interactions with Kasifade.
            </p>
          </LegalSection>

          <LegalSection title="2. Information we may collect">
            <p>
              Depending on how you use our website and services, we may collect
              information such as your name, contact details, booking
              information and other information that you voluntarily provide
              to us.
            </p>

            <p>
              We may also receive basic technical information when you visit
              our website, such as information about your browser, device and
              how you interact with the website.
            </p>
          </LegalSection>

          <LegalSection title="3. How we use your information">
            <p>
              Information may be used to:
            </p>

            <ul>
              <li>process and manage bookings;</li>
              <li>communicate with you about your booking;</li>
              <li>respond to enquiries and requests;</li>
              <li>improve our website and customer experience;</li>
              <li>maintain the security and functionality of our services;</li>
              <li>meet applicable legal or regulatory requirements.</li>
            </ul>
          </LegalSection>

          <LegalSection title="4. Sharing your information">
            <p>
              We do not intend to sell your personal information. Information
              may be shared with service providers where this is reasonably
              necessary to operate our website, booking process or business,
              or where disclosure is required by law.
            </p>
          </LegalSection>

          <LegalSection title="5. Protecting your information">
            <p>
              We take reasonable measures to protect personal information
              against unauthorised access, loss, misuse or disclosure.
              However, no internet-based system can be guaranteed to be
              completely secure.
            </p>
          </LegalSection>

          <LegalSection title="6. Your rights">
            <p>
              You may have rights regarding the personal information we hold
              about you, including requesting access to or correction of your
              information where applicable.
            </p>

            <p>
              If you have a privacy-related request or concern, please contact
              us using the details provided on our website.
            </p>
          </LegalSection>

          <LegalSection title="7. Cookies and website technologies">
            <p>
              Our website may use cookies or similar technologies to provide
              essential functionality, improve performance or understand how
              visitors use the website.
            </p>

            <p>
              The specific technologies used may change as the website and its
              services develop.
            </p>
          </LegalSection>

          <LegalSection title="8. Changes to this policy">
            <p>
              We may update this Privacy Policy from time to time to reflect
              changes to our business, website or legal requirements. The
              updated version will be published on this page with a revised
              update date.
            </p>
          </LegalSection>

          <LegalSection title="9. Contact us">
            <p>
              If you have questions about this Privacy Policy or how your
              personal information is handled, please contact Kasifade
              Barbershop.
            </p>

            <div className="mt-6 rounded-2xl bg-forest p-6 text-cream">
              <p className="font-semibold">Kasifade Barbershop</p>
              <p className="mt-2 text-sm text-cream/70">
                Tembisa, Gauteng
              </p>
              <p className="mt-1 text-sm text-cream/70">
                hello@kasifade.co.za
              </p>
            </div>
          </LegalSection>

        </div>
      </section>
    </main>
  );
}

function LegalSection({ title, children }) {
  return (
    <section className="border-b border-forest/10 pb-10 last:border-0">
      <h2 className="font-display text-2xl md:text-3xl">
        {title}
      </h2>

      <div className="mt-5 space-y-4 text-sm leading-7 text-forest/70 md:text-base">
        {children}
      </div>
    </section>
  );
}
