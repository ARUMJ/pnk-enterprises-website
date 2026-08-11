import type { Metadata } from "next";
import { notFound } from "next/navigation";

import CategoryIcon from "@/components/media/CategoryIcon";
import MediaFrame from "@/components/media/MediaFrame";
import Reveal from "@/components/motion/Reveal";
import AvailabilityNote from "@/components/products/AvailabilityNote";
import EnquiryPanel from "@/components/products/EnquiryPanel";
import ProductCategoryCard from "@/components/products/ProductCategoryCard";
import ContactCta from "@/components/sections/ContactCta";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { Container, Eyebrow, Section } from "@/components/ui/Section";
import localBusiness from "@/data/localBusiness.json";
import {
  getProductCategory,
  productCategories,
  relatedCategories,
} from "@/lib/products";
import { pageMetadata } from "@/lib/siteMeta";

type PageProps = { params: Promise<{ slug: string }> };

/**
 * Category routes are fully known at build time, so they are pre-rendered as
 * static HTML. `dynamicParams = false` means an unknown slug 404s rather than
 * being rendered on demand — which keeps the route static and stops crawlers
 * discovering infinite thin URLs.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return productCategories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getProductCategory(slug);
  if (!category) return {};

  return pageMetadata({
    title: category.metaTitle,
    description: category.metaDescription,
    path: `/products/${category.slug}`,
  });
}

export default async function ProductCategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = getProductCategory(slug);
  if (!category) notFound();

  const related = relatedCategories(category.slug);
  const { main, branch } = localBusiness.addresses;

  return (
    <main id="main" className="flex-1">
      {/* ---- Category header ---- */}
      <Section className="border-ink-200 bg-bone border-b pt-12 sm:pt-16">
        <Container>
          <Breadcrumbs
            trail={[
              { name: "Home", path: "/" },
              { name: "Products", path: "/products" },
              { name: category.name, path: `/products/${category.slug}` },
            ]}
            className="mb-10"
          />

          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
            <div>
              <Reveal>
                <Eyebrow>{category.tagline}</Eyebrow>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="text-ink-900 mt-4 text-[clamp(2.2rem,5.5vw,3.6rem)] leading-[1.05]">
                  {category.name}
                </h1>
              </Reveal>
              <Reveal delay={140}>
                <p className="text-ink-600 mt-6 max-w-xl text-base leading-relaxed sm:text-lg">
                  {category.intro}
                </p>
              </Reveal>
              <Reveal delay={200}>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <ButtonLink href="#enquire" size="lg">
                    Enquire about this range
                  </ButtonLink>
                  <ButtonLink href="/products" size="lg" variant="ghost">
                    All ranges
                  </ButtonLink>
                </div>
              </Reveal>
            </div>

            <Reveal delay={160} variant="mask">
              <MediaFrame
                src={category.image}
                alt={category.imageAlt ?? undefined}
                ratio="landscape"
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                fallback={
                  <CategoryIcon
                    name={category.icon}
                    className="text-ink-400 h-16 w-16"
                  />
                }
                reservedLabel="Product photography to be supplied by the business"
              />
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ---- Photographs of the range -----------------------------------
          Only rendered where the business has supplied more than one
          photograph of this range. Nothing is padded with stock imagery, so a
          range with no photography simply has no gallery. */}
      {category.gallery.length > 1 ? (
        <Section
          labelledBy="gallery-heading"
          className="border-ink-200 bg-bone-dark border-y"
        >
          <Container>
            <Reveal>
              <h2
                id="gallery-heading"
                className="text-ink-900 text-[clamp(1.9rem,4vw,2.7rem)] leading-[1.1]"
              >
                From the range
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <p className="text-ink-600 mt-5 max-w-xl text-base leading-relaxed">
                Photographs of stock the business carries. Availability of any
                particular item is confirmed directly with the business.
              </p>
            </Reveal>
            <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {category.gallery.map((photo, index) => (
                <Reveal
                  as="li"
                  key={photo.src}
                  delay={index * 70}
                  variant="mask"
                >
                  <MediaFrame
                    src={photo.src}
                    alt={photo.alt}
                    ratio="square"
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                    className="border-ink-200 border"
                  />
                </Reveal>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      {/* ---- Product types in this range ---- */}
      <Section labelledBy="types-heading" className="bg-bone">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div>
              <Reveal>
                <h2
                  id="types-heading"
                  className="text-ink-900 text-[clamp(1.9rem,4vw,2.7rem)] leading-[1.1]"
                >
                  What this range covers
                </h2>
              </Reveal>
              <Reveal delay={80}>
                <p className="text-ink-600 mt-5 max-w-md text-base leading-relaxed">
                  These are the product types stocked within the range.
                  Individual products, brands and specifications are confirmed
                  directly with the business.
                </p>
              </Reveal>
              <Reveal delay={140}>
                <AvailabilityNote className="mt-8 max-w-md" />
              </Reveal>
            </div>

            <ul className="border-ink-200 bg-ink-200 grid gap-px overflow-hidden rounded-(--radius-lg) border">
              {category.groups.map((group, index) => (
                <Reveal
                  as="li"
                  key={group.name}
                  delay={index * 70}
                  className="bg-white p-7"
                >
                  <div className="flex items-start gap-4">
                    <CategoryIcon
                      name={category.icon}
                      className="text-brass-600 mt-1 h-6 w-6 shrink-0"
                    />
                    <div>
                      <h3 className="font-display text-ink-900 text-xl">
                        {group.name}
                      </h3>
                      <p className="text-ink-600 mt-2 text-sm leading-relaxed">
                        {group.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* ---- Suited for + where to buy ---- */}
      <Section
        labelledBy="suited-heading"
        className="border-ink-200 bg-bone-dark border-y"
      >
        <Container>
          <div className="grid gap-14 sm:grid-cols-2 lg:gap-20">
            <div>
              <Reveal>
                <h2
                  id="suited-heading"
                  className="text-ink-900 text-[clamp(1.9rem,4vw,2.7rem)] leading-[1.1]"
                >
                  Suited for
                </h2>
              </Reveal>
              <Reveal delay={80}>
                <ul className="mt-8 space-y-5">
                  {category.suitedFor.map((point) => (
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
            </div>

            <div>
              <Reveal>
                <h2 className="text-ink-900 text-[clamp(1.9rem,4vw,2.7rem)] leading-[1.1]">
                  Where to buy it
                </h2>
              </Reveal>
              <Reveal delay={80}>
                <p className="text-ink-600 mt-5 text-base leading-relaxed">
                  Both Lagos locations are open to customers. The business also
                  sells and supplies to different states within Nigeria.
                </p>
              </Reveal>
              <Reveal delay={140}>
                <ul className="mt-8 space-y-4">
                  {[main, branch].map((address) => (
                    <li
                      key={address.label}
                      className="border-ink-200 bg-bone rounded-(--radius-md) border p-5"
                    >
                      <h3 className="text-brass-700 text-xs font-semibold tracking-[0.18em] uppercase">
                        {address.label}
                      </h3>
                      <address className="font-display text-ink-900 mt-2 text-base leading-relaxed not-italic">
                        {address.formatted}
                      </address>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---- Enquiry ---- */}
      <Section id="enquire" labelledBy="enquire-heading" className="bg-bone">
        <Container>
          <Reveal>
            <EnquiryPanel
              categoryName={category.name}
              heading={`Enquire about ${category.name.toLowerCase()}`}
              description={`Tell the business what you are looking for within the ${category.name.toLowerCase()} range and it will confirm what is currently available.`}
              headingId="enquire-heading"
            />
          </Reveal>
        </Container>
      </Section>

      {/* ---- Related ranges ---- */}
      <Section
        labelledBy="related-heading"
        className="border-ink-200 bg-bone-dark border-t"
      >
        <Container>
          <Reveal>
            <h2
              id="related-heading"
              className="text-ink-900 text-[clamp(1.9rem,4vw,2.7rem)] leading-[1.1]"
            >
              Other ranges
            </h2>
          </Reveal>

          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item, index) => (
              <Reveal as="li" key={item.slug} delay={index * 70}>
                <ProductCategoryCard category={item} variant="compact" />
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      <ContactCta />
    </main>
  );
}
