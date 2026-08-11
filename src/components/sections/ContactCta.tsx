import Reveal from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Container, Eyebrow, Section } from "@/components/ui/Section";
import localBusiness from "@/data/localBusiness.json";
import { telHref } from "@/lib/contact";

/**
 * Closing call to action plus the two verified locations.
 *
 * Surface: warm bone-dark, dark ink typography, brass used only as an accent.
 * This section previously sat on `bg-ink-950`, which put dark button labels on
 * a near-black background (measured 1.09:1). A light surface is both readable
 * and consistent with the ink + bone + brass language used across the site.
 *
 * Deliberately omits opening hours and geo-coordinates: neither has been
 * supplied, and inventing them would misdirect customers to a closed shop.
 */
export default function ContactCta() {
  const { main, branch } = localBusiness.addresses;

  return (
    <Section
      id="contact"
      labelledBy="contact-heading"
      className="border-ink-200 bg-bone-dark relative isolate overflow-hidden border-t"
    >
      {/* Decorative warmth. Very low opacity so text contrast is unaffected. */}
      <div
        aria-hidden="true"
        className="pnk-grain absolute inset-0 opacity-[0.18]"
      />

      <Container className="relative">
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <Reveal>
              <Eyebrow>Get in touch</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h2
                id="contact-heading"
                className="text-ink-900 mt-4 text-[clamp(2rem,4.5vw,3rem)] leading-[1.1]"
              >
                Visit a location or call the business
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="text-ink-700 mt-5 max-w-md text-base leading-relaxed">
                Speak to PNK ENTERPRISES directly about the ranges currently in
                stock, or visit either Lagos location in person.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <ButtonLink
                  href={telHref(localBusiness.phones[0] ?? "")}
                  size="lg"
                >
                  Call {localBusiness.phones[0]}
                </ButtonLink>
                <ButtonLink
                  href={`mailto:${localBusiness.email}`}
                  size="lg"
                  variant="secondary"
                >
                  Send an email
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            {[main, branch].map((address, index) => (
              <Reveal
                key={address.label}
                delay={index * 90}
                className="border-ink-200 rounded-(--radius-lg) border bg-white p-7"
              >
                <h3 className="text-brass-700 font-sans text-xs font-semibold tracking-[0.18em] uppercase">
                  {address.label}
                </h3>
                <address className="text-ink-800 mt-3 text-sm leading-relaxed not-italic">
                  {address.formatted}
                </address>
              </Reveal>
            ))}

            <Reveal
              delay={180}
              className="border-ink-200 rounded-(--radius-lg) border bg-white p-7"
            >
              <h3 className="text-brass-700 font-sans text-xs font-semibold tracking-[0.18em] uppercase">
                Phone
              </h3>
              <ul className="mt-3 space-y-2">
                {localBusiness.phones.map((phone) => (
                  <li key={phone}>
                    <a
                      href={telHref(phone)}
                      className="text-ink-800 hover:text-brass-700 text-sm underline-offset-4 transition-colors hover:underline"
                    >
                      {phone}
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
