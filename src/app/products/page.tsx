import type { Metadata } from "next";

import CategoryIcon from "@/components/media/CategoryIcon";
import MediaFrame from "@/components/media/MediaFrame";
import Reveal from "@/components/motion/Reveal";
import ContactCta from "@/components/sections/ContactCta";
import { Container, Eyebrow, Section } from "@/components/ui/Section";
import categoryData from "@/data/productCategories.json";
import { pageMetadata } from "@/lib/siteMeta";

export const metadata: Metadata = pageMetadata({
  title: "Products — Vacuum Flasks, Kitchen Equipment & Home Appliances",
  description:
    "The ranges stocked by PNK ENTERPRISES: vacuum flasks, kitchen equipment such as pots and cutlery sets, home appliances including blenders, toasters, microwave ovens and air fryers, coolers and household items.",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <main id="main" className="flex-1">
      <Section className="border-ink-200 bg-bone border-b pt-16 sm:pt-20">
        <Container>
          <Reveal>
            <Eyebrow>Products</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="text-ink-900 mt-4 max-w-3xl text-[clamp(2.4rem,6vw,4rem)] leading-[1.05]">
              The ranges we stock
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <p className="text-ink-600 mt-6 max-w-2xl text-base leading-relaxed sm:text-lg">
              PNK ENTERPRISES supplies household items, vacuum flasks, kitchen
              equipment and home appliances. The categories below are confirmed
              by the business. Individual products, brands, specifications,
              prices and availability will be published once the client supplies
              the full catalogue.
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section className="bg-bone">
        <Container>
          <div className="space-y-20 sm:space-y-28">
            {categoryData.categories.map((category, index) => (
              <article
                key={category.slug}
                id={category.slug}
                aria-labelledby={`${category.slug}-heading`}
                className="group grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
              >
                <Reveal
                  variant="mask"
                  className={index % 2 === 1 ? "lg:order-2" : ""}
                >
                  <MediaFrame
                    src={category.image}
                    ratio="wide"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    fallback={
                      <CategoryIcon
                        name={category.icon}
                        className="text-ink-400 h-16 w-16"
                      />
                    }
                    reservedLabel={`${category.name} photography pending`}
                  />
                </Reveal>

                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <Reveal delay={60}>
                    <p
                      aria-hidden="true"
                      className="font-display text-brass-600 text-sm"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h2
                      id={`${category.slug}-heading`}
                      className="text-ink-900 mt-2 text-[clamp(1.8rem,3.5vw,2.6rem)] leading-tight"
                    >
                      {category.name}
                    </h2>
                  </Reveal>
                  <Reveal delay={120}>
                    <p className="text-ink-600 mt-4 text-base leading-relaxed">
                      {category.summary}
                    </p>
                  </Reveal>
                  <Reveal delay={180}>
                    <h3 className="text-ink-500 mt-8 font-sans text-xs font-semibold tracking-[0.18em] uppercase">
                      Included in this range
                    </h3>
                    <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                      {category.items.map((item) => (
                        <li
                          key={item}
                          className="text-ink-700 flex items-center gap-2.5 text-sm"
                        >
                          <span
                            aria-hidden="true"
                            className="bg-brass-500 h-1 w-1 shrink-0 rounded-full"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <ContactCta />
    </main>
  );
}
