import Image from "next/image";

import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";

/**
 * Photographs supplied by the business, of stock it carries. Each caption
 * names the product type only — no prices, no models presented as an offer
 * and no claim about what is in stock today.
 */
const heroShots = [
  {
    src: "/images/products/gluck-vacuum-food-jar.webp",
    alt: "A GLÜCK Premium vacuum-insulated stainless steel food jar with a carry handle.",
    label: "Vacuum flasks",
  },
  {
    src: "/images/products/crown-star-aluminium-cookware-set.webp",
    alt: "A Crown Star Master Chef ten-piece aluminium cookware set of lidded pots in graduated sizes.",
    label: "Kitchen equipment",
  },
  {
    src: "/images/products/sokany-air-fryer.webp",
    alt: "A Sokany healthy air fryer with twin control dials and a pull-out frying drawer.",
    label: "Home appliances",
  },
  {
    src: "/images/products/gluck-vacuum-tumbler.webp",
    alt: "A GLÜCK Premium vacuum-insulated stainless steel tumbler with a handle and straw lid.",
    label: "Flasks & tumblers",
  },
];

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
              <ButtonLink href="/products" size="lg" variant="inverse">
                Explore the range
              </ButtonLink>
              <ButtonLink href="/contact" size="lg" variant="inverseOutline">
                Contact the business
              </ButtonLink>
            </div>

            <p
              data-enter
              style={{ "--enter-delay": "400ms" }}
              className="text-ink-300 mt-8 text-sm"
            >
              Trading as {""}
              <span className="text-bone font-medium">
                PETER N KABAI ENTERPRISES
              </span>{" "}
              · Branch:{" "}
              <span className="text-bone font-medium">CLAREAN PEEKAN LTD</span>
            </p>
          </div>

          {/* ---- Composition column ----------------------------------------
              Four photographs of stock the business actually carries, supplied
              by the business itself. Each tile keeps the square MediaFrame
              geometry the rest of the site uses, so the hero stays a
              composition rather than a gallery — four images, generous gaps,
              no copy competing with the headline. */}
          <div
            data-enter
            style={{ "--enter-delay": "300ms", "--enter-shift": "2.5rem" }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4 sm:gap-5">
              {heroShots.map((shot, index) => (
                <figure
                  key={shot.src}
                  className={[
                    "pnk-float border-bone/10 bg-bone/[0.045] relative overflow-hidden rounded-(--radius-lg) border backdrop-blur-sm",
                    index % 2 === 1 ? "translate-y-6" : "",
                  ].join(" ")}
                  style={{ "--float-delay": `${index * 900}ms` }}
                >
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    width={1000}
                    height={1000}
                    priority={index === 0}
                    sizes="(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 45vw"
                    className="aspect-square w-full object-cover"
                  />
                  <figcaption className="from-ink-950 via-ink-950/85 absolute inset-x-0 bottom-0 bg-gradient-to-t to-transparent px-4 pt-12 pb-3">
                    <span className="text-bone text-xs font-medium tracking-wide">
                      {shot.label}
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
