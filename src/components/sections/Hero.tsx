import CategoryIcon from "@/components/media/CategoryIcon";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { categoryGroupNames, productCategories } from "@/lib/products";

/**
 * Homepage hero.
 *
 * Server Component — the entrance choreography is pure CSS (`data-enter` plus
 * staggered `--enter-delay`), so the most important part of the page ships no
 * JavaScript at all and paints as fast as the HTML arrives.
 *
 * Every claim here is traceable to docs/KICKOFF.md: the product categories,
 * the two Lagos locations and nationwide supply within Nigeria. There are no
 * ratings, counts, years of experience or delivery promises.
 */
export default function Hero() {
  const marks = productCategories.slice(0, 4);

  return (
    <section
      aria-labelledby="hero-heading"
      className="bg-ink-950 text-bone relative isolate overflow-hidden"
    >
      {/* Ambient background. Decorative, GPU-cheap, no images, no requests. */}
      <div
        aria-hidden="true"
        className="pnk-grain absolute inset-0 opacity-70"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 h-80 bg-[radial-gradient(60%_100%_at_50%_100%,rgba(204,159,74,0.18),transparent)]"
      />

      <Container className="relative py-24 sm:py-32 lg:py-36">
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          {/* ---- Copy column ---- */}
          <div>
            <p
              data-enter
              style={{ "--enter-delay": "60ms" }}
              className="border-bone/15 bg-bone/[0.04] text-brass-200 inline-flex items-center gap-2.5 rounded-full border px-4 py-1.5 text-[0.7rem] font-medium tracking-[0.16em] uppercase"
            >
              <span
                aria-hidden="true"
                className="bg-brass-400 h-1.5 w-1.5 rounded-full"
              />
              Lagos Island &amp; Idumota
            </p>

            <h1
              id="hero-heading"
              data-enter
              style={{ "--enter-delay": "140ms" }}
              className="text-bone mt-7 text-[clamp(2.6rem,7vw,4.6rem)] leading-[1.03]"
            >
              Quality household essentials
              <span className="text-brass-300 block">for modern living</span>
            </h1>

            <p
              data-enter
              style={{ "--enter-delay": "230ms" }}
              className="text-ink-200 mt-7 max-w-xl text-base leading-relaxed sm:text-lg"
            >
              PNK ENTERPRISES supplies vacuum flasks, kitchen equipment and home
              appliances from two locations in Lagos — and on to customers
              across Nigeria. We build the range around genuine, reliable
              products rather than sheer volume.
            </p>

            <div
              data-enter
              style={{ "--enter-delay": "320ms" }}
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <ButtonLink
                href="/products"
                size="lg"
                className="bg-bone text-ink-950 hover:bg-brass-100"
              >
                Explore the range
              </ButtonLink>
              <ButtonLink
                href="/contact"
                size="lg"
                variant="secondary"
                className="border-bone/25 text-bone hover:border-bone/60 hover:bg-bone/[0.06]"
              >
                Contact the business
              </ButtonLink>
            </div>

            <p
              data-enter
              style={{ "--enter-delay": "400ms" }}
              className="text-ink-400 mt-8 text-sm"
            >
              Trading as {""}
              <span className="text-ink-300">PETER N KABAI ENTERPRISES</span> ·
              Branch: <span className="text-ink-300">CLAREAN PEEKAN LTD</span>
            </p>
          </div>

          {/* ---- Composition column ----------------------------------------
              A structured arrangement of category marks. This is deliberately
              graphic rather than photographic: it looks intentional now, and
              each tile is a MediaFrame-shaped slot that real product
              photography can occupy later without touching the layout. */}
          <div
            data-enter
            style={{ "--enter-delay": "300ms", "--enter-shift": "2.5rem" }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4 sm:gap-5">
              {marks.map((category, index) => (
                <div
                  key={category.slug}
                  className={[
                    "pnk-float group border-bone/10 bg-bone/[0.045] relative flex aspect-square flex-col justify-between overflow-hidden rounded-(--radius-lg) border p-5 backdrop-blur-sm",
                    index % 2 === 1 ? "translate-y-6" : "",
                  ].join(" ")}
                  style={{ "--float-delay": `${index * 900}ms` }}
                >
                  <CategoryIcon
                    name={category.icon}
                    className="text-brass-300 h-9 w-9"
                  />
                  <div>
                    <p className="font-display text-bone text-lg leading-tight">
                      {category.name}
                    </p>
                    <p className="text-ink-400 mt-1 text-xs leading-relaxed">
                      {categoryGroupNames(category).slice(0, 2).join(" · ")}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-ink-500 mt-8 text-center text-[0.7rem] tracking-[0.14em] uppercase">
              Product photography to be added
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
