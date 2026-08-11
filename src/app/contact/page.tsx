import type { Metadata } from "next";

import Reveal from "@/components/motion/Reveal";
import { Container, Eyebrow, Section } from "@/components/ui/Section";
import localBusiness from "@/data/localBusiness.json";
import { telHref } from "@/lib/contact";
import { pageMetadata } from "@/lib/siteMeta";

export const metadata: Metadata = pageMetadata({
  title: "Contact & Locations in Lagos",
  description:
    "Contact PNK ENTERPRISES by phone or email, or visit the main address at Isale Agbede Street, Lagos Island, or the branch at Merciful Line, Ebute Ero Market, Idumota, Lagos.",
  path: "/contact",
});

export default function ContactPage() {
  const { main, branch } = localBusiness.addresses;

  return (
    <main id="main" className="flex-1">
      <Section className="border-ink-200 bg-bone border-b pt-16 sm:pt-20">
        <Container>
          <Reveal>
            <Eyebrow>Contact</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="text-ink-900 mt-4 max-w-3xl text-[clamp(2.4rem,6vw,4rem)] leading-[1.05]">
              Speak to PNK ENTERPRISES
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <p className="text-ink-600 mt-6 max-w-2xl text-base leading-relaxed sm:text-lg">
              Call or email the business directly, or visit either Lagos
              location in person.
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section className="bg-bone">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
            {/* Phone + email */}
            <div>
              <Reveal>
                <h2 className="text-ink-900 text-[clamp(1.8rem,3.5vw,2.4rem)] leading-tight">
                  Phone &amp; email
                </h2>
              </Reveal>

              <Reveal delay={80}>
                <h3 className="text-ink-500 mt-8 text-xs font-semibold tracking-[0.18em] uppercase">
                  Phone numbers
                </h3>
                <ul className="mt-4 space-y-3">
                  {localBusiness.phones.map((phone) => (
                    <li key={phone}>
                      <a
                        href={telHref(phone)}
                        className="group font-display text-ink-900 hover:text-brass-700 inline-flex items-center gap-3 text-xl underline-offset-4 transition-colors hover:underline"
                      >
                        <span
                          aria-hidden="true"
                          className="bg-brass-500 h-1.5 w-1.5 rounded-full transition-transform duration-(--duration-base) group-hover:scale-150 motion-reduce:transform-none"
                        />
                        {phone}
                      </a>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={140}>
                <h3 className="text-ink-500 mt-10 text-xs font-semibold tracking-[0.18em] uppercase">
                  Email
                </h3>
                <a
                  href={`mailto:${localBusiness.email}`}
                  className="font-display text-ink-900 hover:text-brass-700 mt-4 inline-block text-xl break-all underline-offset-4 transition-colors hover:underline"
                >
                  {localBusiness.email}
                </a>
              </Reveal>

              <Reveal delay={200}>
                <h3 className="text-ink-500 mt-10 text-xs font-semibold tracking-[0.18em] uppercase">
                  Social media
                </h3>
                <ul className="text-ink-600 mt-4 space-y-2 text-sm">
                  {localBusiness.socialProfiles.map((profile) => (
                    <li key={profile.platform}>
                      <span className="text-ink-900">{profile.platform}:</span>{" "}
                      {profile.handle}
                    </li>
                  ))}
                </ul>
                <p className="text-ink-500 mt-3 text-xs">
                  Profile links will be added once the official profile URLs are
                  confirmed.
                </p>
              </Reveal>
            </div>

            {/* Locations */}
            <div>
              <Reveal>
                <h2 className="text-ink-900 text-[clamp(1.8rem,3.5vw,2.4rem)] leading-tight">
                  Locations
                </h2>
              </Reveal>

              {[main, branch].map((address, index) => (
                <Reveal key={address.label} delay={80 + index * 80}>
                  <div className="border-ink-200 mt-8 rounded-(--radius-lg) border bg-white p-7">
                    <h3 className="text-brass-700 text-xs font-semibold tracking-[0.18em] uppercase">
                      {address.label}
                    </h3>
                    <address className="font-display text-ink-900 mt-3 text-lg leading-relaxed not-italic">
                      {address.formatted}
                    </address>
                  </div>
                </Reveal>
              ))}

              <Reveal delay={240}>
                <p className="text-ink-500 mt-8 text-sm leading-relaxed">
                  Opening hours have not been supplied yet. Please call ahead
                  before visiting.
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
