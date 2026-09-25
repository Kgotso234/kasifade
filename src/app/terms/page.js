
export default function TermsPage() {
  return (
    <main className="min-h-screen bg-cream text-forest">
      {/* Header */}
      <section className="border-b border-forest/10 px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-5xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-mustard">
            Legal
          </p>

          <h1 className="mt-4 max-w-4xl font-display text-4xl leading-[0.95] md:text-7xl">
            TERMS & CONDITIONS
          </h1>

          <p className="mt-6 max-w-2xl text-sm leading-7 text-forest/70 md:text-base">
            These Terms & Conditions explain the rules that apply when you
            access the Kasifade website, make a booking or use our services.
          </p>

          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.15em] text-forest/50">
            Last updated: September 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-4xl space-y-12">

          <LegalSection title="1. About these terms">
            <p>
              By accessing this website or using Kasifade Barbershop's
              services, you agree to comply with these Terms & Conditions.
            </p>

            <p>
              If you do not agree with these terms, please do not use the
              website or booking services.
            </p>
          </LegalSection>

          <LegalSection title="2. Bookings">
            <p>
              Customers are responsible for providing accurate information
              when making a booking.
            </p>

            <p>
              A booking is subject to availability and is only considered
              confirmed once confirmation has been provided through the
              applicable booking process.
            </p>
          </LegalSection>

          <LegalSection title="3. Appointments">
            <p>
              Customers are asked to arrive at the scheduled time. Arriving
              late may reduce the time available for the selected service or
              may require the appointment to be rescheduled.
            </p>

            <p>
              Where possible, customers should contact Kasifade as soon as
              possible if they need to cancel or change an appointment.
            </p>
          </LegalSection>

          <LegalSection title="4. Services and pricing">
            <p>
              Service descriptions, prices and availability displayed on the
              website may change from time to time.
            </p>

            <p>
              The applicable price will be communicated through the booking
              process or at the time the service is provided.
            </p>
          </LegalSection>

          <LegalSection title="5. Payments">
            <p>
              Available payment methods may include cash, card or electronic
              payment methods offered by Kasifade.
            </p>

            <p>
              Payment requirements may vary depending on the service and
              booking process.
            </p>
          </LegalSection>

          <LegalSection title="6. Website use">
            <p>
              You agree not to misuse the website, attempt to gain
              unauthorised access to its systems, interfere with its
              functionality or use the website for unlawful purposes.
            </p>
          </LegalSection>

          <LegalSection title="7. Website content">
            <p>
              Website content, including text, branding, graphics, images and
              other materials, is provided for general informational and
              business purposes.
            </p>

            <p>
              We may update, remove or change website content without prior
              notice.
            </p>
          </LegalSection>

          <LegalSection title="8. Third-party services">
            <p>
              The website may contain links to or rely on third-party
              services. Kasifade is not responsible for the content,
              availability or policies of third-party websites or services.
            </p>
          </LegalSection>

          <LegalSection title="9. Limitation of responsibility">
            <p>
              We take reasonable steps to keep the website available and
              information accurate, but we do not guarantee that the website
              will always be uninterrupted, error-free or available.
            </p>
          </LegalSection>

          <LegalSection title="10. Changes to these terms">
            <p>
              These Terms & Conditions may be updated from time to time.
              Changes will be published on this page and the updated date will
              be revised accordingly.
            </p>
          </LegalSection>

          <LegalSection title="11. Contact">
            <p>
              If you have questions about these Terms & Conditions, please
              contact Kasifade Barbershop.
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