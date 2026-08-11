import type { Metadata } from "next";

import Reveal from "@/components/motion/Reveal";
import AvailabilityNote from "@/components/products/AvailabilityNote";
import EnquiryPanel from "@/components/products/EnquiryPanel";
import ProductCategoryCard from "@/components/products/ProductCategoryCard";
import ContactCta from "@/components/sections/ContactCta";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { Container, Eyebrow, Section } from "@/components/ui/Section";
import { productCategories } from "@/lib/products";
import { pageMetadata } from "@/lib/siteMeta";

export const metadata: Metadata = pageMetadata({
  title: "Products — Vacuum Flasks, Kitchen Equipment & Home Appliances",
  description:
    "Browse the ranges PNK ENTERPRISES supplies in Lagos: vacuum flasks, coolers, kitchen equipment such as pots and cutlery sets, home appliances including blenders, toasters, microwave ovens and air fryers, and general household items.",
  path: "/products",
});

/**
 * Product discovery.
 *
 * The job of this page is to answer four questions quickly: what does this
 * business sell, how is it organised, is it for someone like me, and how do I
 * ask about it. It presents CATEGORIES only — no SKUs, prices, specifications
 * or stock states have been supplied, so none are shown.
 *
 * The first category is given the `feature` card so the grid has a clear
 * entry point instead of five identical tiles.
 */

const audiences = [
  {
    title: "Households",
    body: "Families buying cookware, flasks and appliances for daily use, or replacing something that has worn out.",
  },
  {
    title: "Gifting and new homes",
    body: "Cutlery sets, cookware and flasks bought for weddings, housewarmings and setting up a first kitchen.",
  },
  {
    title: "Traders and resellers",
    body: "Buyers sourcing household goods from the Lagos Island and Ebute Ero Market locations.",
  },
  {
    title: "Customers outside Lagos",
    body: "The business sells and supplies to different states within Nigeria, so enquiries from outside Lagos are welcome.",
  },
];

const steps = [
  {
    title: "Find the range",
    body: "Open the range that matches what you need — flasks, coolers, kitchen equipment, appliances or general household items.",
  },
  {
    title: "Ask what is available",
    body: "Call or email the business with what you are looking for. Stock varies, so this is the reliable way to check.",
  },
  {
    title: "Buy in person or arrange supply",
    body: "Visit either Lagos location, or discuss supply with the business if you are ordering from another state.",
  },
];

export default function ProductsPage() {
  const [lead, ...rest] = productCategories;

  return (
    <main id="main" className="flex-1">
      {/* ---- Page header ---- */}
      <Section className="border-ink-200 bg-bone border-b pt-12 sm:pt-16">
        <Container>
          <Breadcrumbs
            trail={[
              { name: "Home", path: "/" },
              { name: "Products", path: "/products" },
            ]}
            className="mb-10"
          />

          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-16">
            <div>
              <Reveal>
                <Eyebrow>What we supply</Eyebrow>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="text-ink-900 mt-4 max-w-3xl text-[clamp(2.4rem,6vw,4rem)] leading-[1.05]">
                  Household items, kitchen equipment and home appliances
                </h1>
              </Reveal>
              <Reveal delay={140}>
                <p className="text-ink-600 mt-6 max-w-2xl text-base leading-relaxed sm:text-lg">
                  PNK ENTERPRISES stocks five ranges, sold from two locations in
                  Lagos and supplied on to customers in other Nigerian states.
                  Choose a range below to see the product types it covers, then
                  contact the business to ask what is currently available.
                </p>
              </Reveal>
            </div>

            <Reveal delay={200}>
              <AvailabilityNote />
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ---- The ranges ---- */}
      <Section labelledBy="ranges-heading" className="bg-bone">
        <Container>
          <Reveal>
            <h2
              id="ranges-heading"
              className="text-ink-900 text-[clamp(2rem,4.5vw,3rem)] leading-[1.1]"
            >
              The five ranges
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="text-ink-600 mt-5 max-w-2xl text-base leading-relaxed">
              Each range groups the product types the business trades in.
              Specific products, brands and specifications are confirmed
              directly with the business.
            </p>
          </Reveal>

          <ul className="mt-14 grid gap-6 lg:grid-cols-3">
            {lead ? (
              <Reveal as="li" className="lg:col-span-3">
                <ProductCategoryCard category={lead} variant="feature" />
              </Reveal>
            ) : null}

            {rest.map((category, index) => (
              <Reveal as="li" key={category.slug} delay={index * 70}>
                <ProductCategoryCard category={category} />
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ---- Who it is for ---- */}
      <Section
        labelledBy="audience-heading"
        className="border-ink-200 bg-bone-dark border-y"
      >
        <Container>
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div>
              <Reveal>
                <Eyebrow>Who buys here</Eyebrow>
              </Reveal>
              <Reveal delay={80}>
                <h2
                  id="audience-heading"
                  className="text-ink-900 mt-4 text-[clamp(2rem,4.5vw,3rem)] leading-[1.1]"
                >
                  Who the products are for
                </h2>
              </Reveal>
              <Reveal delay={140}>
                <p className="text-ink-600 mt-5 max-w-md text-base leading-relaxed">
                  The ranges are built around everyday household use rather than
                  a single type of customer.
                </p>
              </Reveal>
            </div>

            <ul className="border-ink-200 bg-ink-200 grid gap-px overflow-hidden rounded-(--radius-lg) border sm:grid-cols-2">
              {audiences.map((audience, index) => (
                <Reveal
                  as="li"
                  key={audience.title}
                  delay={index * 80}
                  className="bg-bone p-7"
                >
                  <h3 className="font-display text-ink-900 text-xl">
                    {audience.title}
                  </h3>
                  <p className="text-ink-600 mt-2.5 text-sm leading-relaxed">
                    {audience.body}
                  </p>
                </Reveal>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* ---- How to buy ---- */}
      <Section labelledBy="how-heading" className="bg-bone">
        <Container>
          <Reveal>
            <Eyebrow>How to buy</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h2
              id="how-heading"
              className="text-ink-900 mt-4 max-w-2xl text-[clamp(2rem,4.5vw,3rem)] leading-[1.1]"
            >
              Enquire first, then visit or arrange supply
            </h2>
          </Reveal>

          <ol className="mt-14 grid gap-8 sm:grid-cols-3">
            {steps.map((step, index) => (
              <Reveal as="li" key={step.title} delay={index * 80}>
                <p
                  aria-hidden="true"
                  className="font-display text-brass-600 text-sm"
                >
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="font-display text-ink-900 mt-3 text-xl">
                  <span className="sr-only">{`Step ${index + 1}: `}</span>
                  {step.title}
                </h3>
                <p className="text-ink-600 mt-2.5 text-sm leading-relaxed">
                  {step.body}
                </p>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={120} className="mt-14">
            <EnquiryPanel
              heading="Ask about a product"
              description="Tell the business what you are looking for and it will confirm what is currently available across both Lagos locations."
              headingId="products-enquiry-heading"
            />
          </Reveal>
        </Container>
      </Section>

      <ContactCta />
    </main>
  );
}
