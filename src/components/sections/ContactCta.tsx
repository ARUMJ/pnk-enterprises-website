import Reveal from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Container, Eyebrow, Section } from "@/components/ui/Section";
import localBusiness from "@/data/localBusiness.json";
import { telHref } from "@/lib/contact";

/**
 * Closing call to action plus the two verified locations.
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
      className="bg-ink-950 text-bone relative isolate overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pnk-grain absolute inset-0 opacity-60"
      />

      <Container className="relative">
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <Reveal>
              <Eyebrow className="text-brass-300">Get in touch</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h2
                id="contact-heading"
                className="text-bone mt-4 text-[clamp(2rem,4.5vw,3rem)] leading-[1.1]"
              >
                Visit a location or call the business
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="text-ink-300 mt-5 max-w-md text-base leading-relaxed">
                Speak to PNK ENTERPRISES directly about the ranges currently in
                stock, or visit either Lagos location in person.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <ButtonLink
                  href={telHref(localBusiness.phones[0] ?? "")}
                  size="lg"
                  className="bg-bone text-ink-950 hover:bg-brass-100"
                >
                  Call {localBusiness.phones[0]}
                </ButtonLink>
                <ButtonLink
                  href={`mailto:${localBusiness.email}`}
                  size="lg"
                  variant="secondary"
                  className="border-bone/25 text-bone hover:border-bone/60 hover:bg-bone/[0.06]"
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
                className="border-bone/12 bg-bone/[0.04] rounded-(--radius-lg) border p-7"
              >
                <h3 className="text-brass-300 font-sans text-xs font-semibold tracking-[0.18em] uppercase">
                  {address.label}
                </h3>
                <address className="text-ink-200 mt-3 text-sm leading-relaxed not-italic">
                  {address.formatted}
                </address>
              </Reveal>
            ))}

            <Reveal
              delay={180}
              className="border-bone/12 bg-bone/[0.04] rounded-(--radius-lg) border p-7"
            >
              <h3 className="text-brass-300 font-sans text-xs font-semibold tracking-[0.18em] uppercase">
                Phone
              </h3>
              <ul className="mt-3 space-y-2">
                {localBusiness.phones.map((phone) => (
                  <li key={phone}>
                    <a
                      href={telHref(phone)}
                      className="text-ink-200 hover:text-brass-300 text-sm underline-offset-4 transition-colors hover:underline"
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
