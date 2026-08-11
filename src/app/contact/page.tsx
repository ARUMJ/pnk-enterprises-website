import type { Metadata } from "next";
import Link from "next/link";

import Reveal from "@/components/motion/Reveal";
import EnquiryPanel from "@/components/products/EnquiryPanel";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { Container, Eyebrow, Section } from "@/components/ui/Section";
import localBusiness from "@/data/localBusiness.json";
import { telHref } from "@/lib/contact";
import { pageMetadata } from "@/lib/siteMeta";
import { categoryPath, productCategories } from "@/lib/products";

export const metadata: Metadata = pageMetadata({
  title: "Contact & Locations in Lagos",
  description:
    "Contact PNK ENTERPRISES by phone or email to ask about flasks, kitchen equipment or home appliances, or visit the main address at Isale Agbede Street, Lagos Island, or the branch at Merciful Line, Ebute Ero Market, Idumota.",
  path: "/contact",
});

/**
 * The conversion destination.
 *
 * Hierarchy is deliberate: the enquiry panel comes first because calling or
 * emailing is the action the business wants, then the full phone list, then
 * the two addresses, then the unlinked social handles.
 *
 * No opening hours are shown because none have been supplied, and no map
 * embed is used — every practical embed needs an API key the business does
 * not have, and a broken map is worse than a written address.
 */
export default function ContactPage() {
  const { main, branch } = localBusiness.addresses;

  return (
    <main id="main" className="flex-1">
      <Section className="border-ink-200 bg-bone border-b pt-12 sm:pt-16">
        <Container>
          <Breadcrumbs
            trail={[
              { name: "Home", path: "/" },
              { name: "Contact", path: "/contact" },
            ]}
            className="mb-10"
          />
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
              Call or email the business to ask about flasks, coolers, kitchen
              equipment, home appliances or household items — or visit either
              Lagos location in person.
            </p>
          </Reveal>

          <Reveal delay={200} className="mt-12">
            <EnquiryPanel
              heading="Make an enquiry"
              description="The quickest way to find out what is currently available is to contact the business directly."
              headingId="enquiry-heading"
            />
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
                <p className="text-ink-500 mt-3 text-sm">
                  All three numbers reach the business. Selecting one opens your
                  phone app to dial it.
                </p>
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
                <p className="text-ink-500 mt-3 text-sm leading-relaxed">
                  The business also sells and supplies to different states
                  within Nigeria.
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* Crawlable route back into the product architecture. */}
      <Section
        labelledBy="ranges-link-heading"
        className="border-ink-200 bg-bone-dark border-t"
      >
        <Container>
          <Reveal>
            <h2
              id="ranges-link-heading"
              className="text-ink-900 text-[clamp(1.8rem,3.5vw,2.4rem)] leading-tight"
            >
              Enquiring about a particular range?
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="text-ink-600 mt-5 max-w-2xl text-base leading-relaxed">
              Open the range you are interested in and use the enquiry option
              there — your message will arrive with the range already noted.
            </p>
          </Reveal>
          <Reveal delay={140}>
            <ul className="mt-8 flex flex-wrap gap-3">
              {productCategories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={categoryPath(category.slug)}
                    className="border-ink-200 text-ink-700 hover:border-ink-400 hover:text-ink-900 bg-bone inline-flex rounded-full border px-4 py-2 text-sm transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </Section>
    </main>
  );
}
