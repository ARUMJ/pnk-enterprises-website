import type { Metadata } from "next";

import Reveal from "@/components/motion/Reveal";
import ContactCta from "@/components/sections/ContactCta";
import OwnerPortrait from "@/components/sections/OwnerPortrait";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { Container, Eyebrow, Section } from "@/components/ui/Section";
import localBusiness from "@/data/localBusiness.json";
import { pageMetadata } from "@/lib/siteMeta";

export const metadata: Metadata = pageMetadata({
  title: "About the Business",
  description:
    "PNK ENTERPRISES (PETER N KABAI ENTERPRISES) is a Lagos household-goods business supplying vacuum flasks, kitchen equipment and home appliances, with a branch trading as CLAREAN PEEKAN LTD.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <main id="main" className="flex-1">
      <Section className="border-ink-200 bg-bone border-b pt-12 sm:pt-16">
        <Container>
          <Breadcrumbs
            trail={[
              { name: "Home", path: "/" },
              { name: "About", path: "/about" },
            ]}
            className="mb-10"
          />
          <Reveal>
            <Eyebrow>About</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="text-ink-900 mt-4 max-w-3xl text-[clamp(2.4rem,6vw,4rem)] leading-[1.05]">
              A Lagos household-goods business
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <p className="text-ink-600 mt-6 max-w-2xl text-base leading-relaxed sm:text-lg">
              {localBusiness.description}
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section className="bg-bone">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <div>
              <Reveal>
                <h2 className="text-ink-900 text-[clamp(1.8rem,3.5vw,2.4rem)] leading-tight">
                  Identity
                </h2>
              </Reveal>
              <Reveal delay={80}>
                <dl className="mt-8 space-y-6">
                  <div className="border-ink-200 border-b pb-5">
                    <dt className="text-ink-500 text-xs font-semibold tracking-[0.18em] uppercase">
                      Business name
                    </dt>
                    <dd className="font-display text-ink-900 mt-2 text-xl">
                      {localBusiness.name}
                    </dd>
                  </div>
                  <div className="border-ink-200 border-b pb-5">
                    <dt className="text-ink-500 text-xs font-semibold tracking-[0.18em] uppercase">
                      Full name
                    </dt>
                    <dd className="font-display text-ink-900 mt-2 text-xl">
                      {localBusiness.legalName}
                    </dd>
                  </div>
                  <div className="border-ink-200 border-b pb-5">
                    <dt className="text-ink-500 text-xs font-semibold tracking-[0.18em] uppercase">
                      Branch
                    </dt>
                    <dd className="font-display text-ink-900 mt-2 text-xl">
                      {localBusiness.branchName}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-ink-500 text-xs font-semibold tracking-[0.18em] uppercase">
                      What the business sells
                    </dt>
                    <dd className="font-display text-ink-900 mt-2 text-xl">
                      Household items, kitchen equipment and home appliances
                      <span className="text-ink-500 mt-1 block font-sans text-sm">
                        Five ranges, sold from two Lagos locations
                      </span>
                    </dd>
                  </div>
                </dl>
              </Reveal>
            </div>

            <div>
              <Reveal>
                <h2 className="text-ink-900 text-[clamp(1.8rem,3.5vw,2.4rem)] leading-tight">
                  Priorities
                </h2>
              </Reveal>
              <Reveal delay={80}>
                <ul className="mt-8 space-y-5">
                  {[
                    "Quality over quantity",
                    "Authenticity in what is stocked and sold",
                    "Supplying genuine and reliable products",
                    "Public exposure and visibility for the business",
                  ].map((point) => (
                    <li
                      key={point}
                      className="text-ink-700 flex gap-3.5 text-base leading-relaxed"
                    >
                      <span
                        aria-hidden="true"
                        className="bg-brass-500 mt-2.5 h-1 w-1 shrink-0 rounded-full"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={140}>
                <h2 className="text-ink-900 mt-14 text-[clamp(1.8rem,3.5vw,2.4rem)] leading-tight">
                  Reach
                </h2>
              </Reveal>
              <Reveal delay={200}>
                <p className="text-ink-600 mt-5 text-base leading-relaxed">
                  {localBusiness.distribution.current}
                </p>
                <p className="text-ink-600 mt-3 text-base leading-relaxed">
                  {localBusiness.distribution.aspiration} This is a stated
                  ambition rather than a service currently offered.
                </p>
              </Reveal>

              <Reveal delay={240}>
                <ButtonLink
                  href="/products"
                  variant="secondary"
                  className="mt-9"
                >
                  See the ranges we supply
                </ButtonLink>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      <OwnerPortrait />

      <ContactCta />
    </main>
  );
}
