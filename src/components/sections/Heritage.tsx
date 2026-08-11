import Reveal from "@/components/motion/Reveal";
import { Container, Eyebrow, Section } from "@/components/ui/Section";

/**
 * Business story.
 *
 * The 1998 start year is the single most sensitive fact on the site. It is
 * shown exactly once, always with the mandated qualifier, and it is never
 * emitted as a structured-data `foundingDate`. See docs/KICKOFF.md.
 */
export default function Heritage() {
  return (
    <Section id="story" labelledBy="story-heading" className="bg-bone">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <Eyebrow className="justify-center">The business</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h2
              id="story-heading"
              className="text-ink-900 mt-4 text-[clamp(2rem,4.5vw,3rem)] leading-[1.1]"
            >
              A long-standing Lagos household-goods business
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="text-ink-600 mt-6 text-base leading-relaxed sm:text-lg">
              PNK ENTERPRISES — full name PETER N KABAI ENTERPRISES — trades in
              household items, vacuum flasks, kitchen equipment and home
              appliances, with a branch operating as CLAREAN PEEKAN LTD. The
              owner reports that the business began in{" "}
              <span className="text-ink-900 whitespace-nowrap">1998</span>.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <p className="text-ink-500 mx-auto mt-4 max-w-xl text-sm">
              1998 (owner-stated; not independently verified)
            </p>
          </Reveal>
        </div>

        <Reveal delay={120} className="mt-16">
          <div className="pnk-rule h-px w-full" />
        </Reveal>

        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <Reveal>
            <h3 className="font-display text-ink-900 text-lg">Today</h3>
            <p className="text-ink-600 mt-3 text-sm leading-relaxed">
              Operating from Lagos Island and Idumota, supplying customers in
              Lagos and other states across Nigeria.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h3 className="font-display text-ink-900 text-lg">Focus</h3>
            <p className="text-ink-600 mt-3 text-sm leading-relaxed">
              Quality over quantity, and authenticity in what is stocked and
              sold.
            </p>
          </Reveal>
          <Reveal delay={160}>
            <h3 className="font-display text-ink-900 text-lg">Ambition</h3>
            <p className="text-ink-600 mt-3 text-sm leading-relaxed">
              The business aspires to expand exports beyond Nigeria. This is a
              stated goal, not a service offered today.
            </p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
