import CategoryIcon from "@/components/media/CategoryIcon";
import MediaFrame from "@/components/media/MediaFrame";
import Reveal from "@/components/motion/Reveal";
import { Container, Eyebrow, Section } from "@/components/ui/Section";
import categoryData from "@/data/productCategories.json";

/**
 * Product-category discovery.
 *
 * Renders the confirmed categories only. Each card is a `MediaFrame` slot, so
 * dropping real photography into `src/data/productCategories.json` (`image`)
 * upgrades this section with no code change.
 */
export default function CategoryGrid() {
  return (
    <Section
      id="categories"
      labelledBy="categories-heading"
      className="bg-bone"
    >
      <Container>
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
              These are the ranges currently stocked. Individual products,
              brands and specifications are added once the client supplies the
              full catalogue.
            </p>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categoryData.categories.map((category, index) => (
            <Reveal
              as="li"
              key={category.slug}
              delay={index * 70}
              className="group"
            >
              <article className="border-ink-200 hover:border-ink-300 flex h-full flex-col overflow-hidden rounded-(--radius-lg) border bg-white transition-[transform,box-shadow,border-color] duration-(--duration-base) ease-(--ease-out-quint) hover:-translate-y-1 hover:shadow-[0_24px_50px_-30px_rgba(14,12,10,0.5)] motion-reduce:transform-none motion-reduce:transition-none">
                <MediaFrame
                  src={category.image}
                  ratio="landscape"
                  className="border-ink-200 rounded-none border-b"
                  fallback={
                    <CategoryIcon
                      name={category.icon}
                      className="text-ink-400 h-12 w-12 transition-transform duration-(--duration-slow) ease-(--ease-out-quint) group-hover:scale-110 motion-reduce:transform-none"
                    />
                  }
                  reservedLabel="Photography pending"
                />

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-ink-900 text-xl">
                    {category.name}
                  </h3>
                  <p className="text-ink-600 mt-2 text-sm leading-relaxed">
                    {category.summary}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {category.items.map((item) => (
                      <li
                        key={item}
                        className="bg-ink-100 text-ink-600 rounded-full px-3 py-1 text-xs"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
