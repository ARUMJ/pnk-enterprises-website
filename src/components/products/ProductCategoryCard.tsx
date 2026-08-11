import Link from "next/link";

import CategoryIcon from "@/components/media/CategoryIcon";
import MediaFrame from "@/components/media/MediaFrame";
import { categoryPath, type ProductCategory } from "@/lib/products";

/**
 * The reusable product-category card.
 *
 * One card system serves the homepage grid, the /products index and the
 * related-ranges strip on a category page. Three variants keep those surfaces
 * from looking like the same block repeated:
 *
 *   - `feature`  — wide, two-column, used once per grid as an anchor
 *   - `standard` — the default portrait-media card
 *   - `compact`  — no media, for dense cross-linking
 *
 * The whole card is a single link to the category route. A nested "Enquire"
 * button is deliberately NOT used inside it: nesting interactive elements
 * inside a link is an accessibility failure, and the enquiry action lives one
 * click away on the category page where the range is in context. The card's
 * own affordance ("View range") states plainly where the click leads.
 *
 * `MediaFrame` reserves the final aspect ratio now, so Phase 3B photography
 * drops in with zero layout shift and zero changes here.
 */

type Variant = "feature" | "standard" | "compact";

const shell =
  "group border-ink-200 hover:border-ink-300 focus-within:border-ink-300 relative flex h-full overflow-hidden rounded-(--radius-lg) border bg-white transition-[transform,box-shadow,border-color] duration-(--duration-base) ease-(--ease-out-quint) hover:-translate-y-1 hover:shadow-[0_24px_50px_-30px_rgba(14,12,10,0.5)] motion-reduce:transform-none motion-reduce:transition-none";

/** Expands the link's hit area to the whole card without nesting controls. */
const stretchedLink =
  "after:absolute after:inset-0 after:content-[''] rounded-(--radius-sm) underline-offset-4 outline-none focus-visible:underline";

function Affordance({ label = "View range" }: { label?: string }) {
  return (
    <span className="text-brass-700 mt-6 inline-flex items-center gap-2 text-sm font-medium">
      {label}
      <span
        aria-hidden="true"
        className="transition-transform duration-(--duration-base) ease-(--ease-out-quint) group-hover:translate-x-1 motion-reduce:transform-none"
      >
        →
      </span>
    </span>
  );
}

export default function ProductCategoryCard({
  category,
  variant = "standard",
  headingLevel = "h3",
  priority = false,
}: {
  category: ProductCategory;
  variant?: Variant;
  /** Set so the card slots into the host page's outline correctly. */
  headingLevel?: "h2" | "h3";
  priority?: boolean;
}) {
  const Heading = headingLevel;
  const href = categoryPath(category.slug);
  const groupNames = category.groups.map((group) => group.name);

  if (variant === "compact") {
    return (
      <article className={`${shell} flex-col p-6`}>
        <CategoryIcon
          name={category.icon}
          className="text-brass-600 h-8 w-8 transition-transform duration-(--duration-slow) ease-(--ease-out-quint) group-hover:scale-110 motion-reduce:transform-none"
        />
        <Heading className="font-display text-ink-900 mt-5 text-lg">
          <Link href={href} className={stretchedLink}>
            {category.name}
          </Link>
        </Heading>
        <p className="text-ink-600 mt-2 text-sm leading-relaxed">
          {category.summary}
        </p>
        <div className="mt-auto">
          <Affordance />
        </div>
      </article>
    );
  }

  if (variant === "feature") {
    return (
      <article className={`${shell} flex-col sm:flex-row`}>
        <MediaFrame
          src={category.image}
          alt={category.imageAlt ?? undefined}
          ratio="landscape"
          priority={priority}
          sizes="(min-width: 1024px) 34vw, (min-width: 640px) 45vw, 100vw"
          className="border-ink-200 rounded-none border-b sm:aspect-auto sm:w-[46%] sm:shrink-0 sm:border-r sm:border-b-0"
          fallback={
            <CategoryIcon
              name={category.icon}
              className="text-ink-400 h-14 w-14 transition-transform duration-(--duration-slow) ease-(--ease-out-quint) group-hover:scale-110 motion-reduce:transform-none"
            />
          }
          reservedLabel="Photography pending"
        />

        <div className="flex flex-1 flex-col p-7 sm:p-9">
          <p className="text-brass-700 text-xs font-semibold tracking-[0.18em] uppercase">
            {category.tagline}
          </p>
          <Heading className="font-display text-ink-900 mt-4 text-[clamp(1.5rem,2.6vw,2rem)] leading-tight">
            <Link href={href} className={stretchedLink}>
              {category.name}
            </Link>
          </Heading>
          <p className="text-ink-600 mt-3 text-base leading-relaxed">
            {category.intro}
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {groupNames.map((name) => (
              <li
                key={name}
                className="border-ink-200 text-ink-600 rounded-full border px-3 py-1 text-xs"
              >
                {name}
              </li>
            ))}
          </ul>
          <div className="mt-auto">
            <Affordance />
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className={`${shell} flex-col`}>
      <MediaFrame
        src={category.image}
        alt={category.imageAlt ?? undefined}
        ratio="landscape"
        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
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
        <Heading className="font-display text-ink-900 text-xl">
          <Link href={href} className={stretchedLink}>
            {category.name}
          </Link>
        </Heading>
        <p className="text-ink-600 mt-2 text-sm leading-relaxed">
          {category.summary}
        </p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {groupNames.slice(0, 4).map((name) => (
            <li
              key={name}
              className="bg-ink-100 text-ink-600 rounded-full px-3 py-1 text-xs"
            >
              {name}
            </li>
          ))}
        </ul>
        <div className="mt-auto">
          <Affordance />
        </div>
      </div>
    </article>
  );
}
