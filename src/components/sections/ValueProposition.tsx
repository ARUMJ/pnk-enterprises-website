import Reveal from "@/components/motion/Reveal";
import { Container, Eyebrow, Section } from "@/components/ui/Section";

/**
 * Positioning section.
 *
 * Each point restates a priority the owner actually stated (quality over
 * quantity, authenticity, visibility, supply across Nigeria). No metrics, no
 * guarantees, no certifications — none have been supplied.
 */
const pillars = [
  {
    title: "Quality over quantity",
    body: "The business is built on stocking genuine, reliable products rather than carrying the largest possible range.",
  },
  {
    title: "Authenticity first",
    body: "Authenticity is a stated priority of the business — customers should get what they believe they are buying.",
  },
  {
    title: "Two Lagos locations",
    body: "A main address on Lagos Island and a branch in Ebute Ero Market, Idumota, both open to customers.",
  },
  {
    title: "Supply across Nigeria",
    body: "The business currently sells and supplies to different states within Nigeria, beyond Lagos.",
  },
];

export default function ValueProposition() {
  return (
    <Section
      id="approach"
      labelledBy="approach-heading"
      className="border-ink-200 bg-bone-dark border-y"
    >
      <Container>
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <Reveal>
              <Eyebrow>How the business works</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h2
                id="approach-heading"
                className="text-ink-900 mt-4 text-[clamp(2rem,4.5vw,3rem)] leading-[1.1]"
              >
                A straightforward promise
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="text-ink-600 mt-5 max-w-md text-base leading-relaxed">
                PNK ENTERPRISES sells household products people rely on daily.
                The positioning below reflects what the business owner has
                stated about how it operates.
              </p>
            </Reveal>
          </div>

          <ul className="border-ink-200 bg-ink-200 grid gap-px overflow-hidden rounded-(--radius-lg) border sm:grid-cols-2">
            {pillars.map((pillar, index) => (
              <Reveal
                as="li"
                key={pillar.title}
                delay={index * 80}
                className="bg-bone p-7"
              >
                <p
                  aria-hidden="true"
                  className="font-display text-brass-600 text-sm"
                >
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="font-display text-ink-900 mt-3 text-xl">
                  {pillar.title}
                </h3>
                <p className="text-ink-600 mt-2.5 text-sm leading-relaxed">
                  {pillar.body}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
