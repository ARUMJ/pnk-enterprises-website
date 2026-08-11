import Reveal from "@/components/motion/Reveal";
import ProductCategoryCard from "@/components/products/ProductCategoryCard";
import { ButtonLink } from "@/components/ui/Button";
import { Container, Eyebrow, Section } from "@/components/ui/Section";
import { productCategories } from "@/lib/products";

/**
 * Homepage product discovery.
 *
 * The homepage's job is to get a visitor into the right range quickly, so
 * every card links through to its category page rather than dead-ending in a
 * list of words. The card system itself lives in `ProductCategoryCard`, shared
 * with /products, so the two surfaces can never drift apart.
 */
export default function CategoryGrid() {
  return (
    <Section
      id="categories"
      labelledBy="categories-heading"
      className="bg-bone"
    >
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow>What we supply</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h2
                id="categories-heading"
                className="text-ink-900 mt-4 text-[clamp(2rem,4.5vw,3rem)] leading-[1.1]"
              >
                Five ranges, built around everyday use
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="text-ink-600 mt-5 text-base leading-relaxed">
                Flasks, coolers, kitchen equipment, home appliances and general
                household items — sold from two Lagos locations and supplied to
                customers in other Nigerian states.
              </p>
            </Reveal>
          </div>

          <Reveal delay={200}>
            <ButtonLink href="/products" variant="secondary">
              Browse all ranges
            </ButtonLink>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {productCategories.map((category, index) => (
            <Reveal as="li" key={category.slug} delay={index * 70}>
              <ProductCategoryCard category={category} />
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
