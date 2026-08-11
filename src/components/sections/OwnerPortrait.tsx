import MediaFrame from "@/components/media/MediaFrame";
import Reveal from "@/components/motion/Reveal";
import { Container, Eyebrow, Section } from "@/components/ui/Section";
import localBusiness from "@/data/localBusiness.json";

/**
 * The owner's photograph.
 *
 * This is a real, client-supplied photograph of the owner — not a stock
 * portrait and not a generated likeness. It has been prepared for the web
 * (reframed to the 4:5 portrait this slot reserves, tonally balanced, and
 * given a shallower depth of field so the subject separates from the
 * background). His face, features and identity are unaltered.
 *
 * The copy is confined to what the owner has actually stated: the business
 * name, the 1998 account (always qualified), and the stated priorities. There
 * is no invented biography, education, job history or credential.
 */
export default function OwnerPortrait() {
  return (
    <Section
      labelledBy="owner-heading"
      className="border-ink-200 bg-bone-dark border-y"
    >
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal variant="mask">
            <figure>
              <MediaFrame
                src="/images/owner/owner-portrait.webp"
                alt={`The owner of ${localBusiness.name}, wearing a pale blue traditional outfit, in a business portrait against a plain studio background.`}
                ratio="portrait"
                sizes="(min-width: 1024px) 32vw, (min-width: 640px) 60vw, 100vw"
              />
              <figcaption className="text-ink-600 mt-4 text-sm leading-relaxed">
                The owner of {localBusiness.name}.
              </figcaption>
            </figure>
          </Reveal>

          <div>
            <Reveal>
              <Eyebrow>The owner</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h2
                id="owner-heading"
                className="text-ink-900 mt-4 text-[clamp(1.9rem,4vw,2.7rem)] leading-[1.1]"
              >
                Run by the person who built it
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="text-ink-600 mt-6 max-w-xl text-base leading-relaxed sm:text-lg">
                {localBusiness.name} trades under the full name{" "}
                {localBusiness.legalName}, with a branch operating as{" "}
                {localBusiness.branchName}. According to the owner&rsquo;s
                account, the business began in 1998 and has traded in household
                goods from Lagos ever since.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <p className="text-ink-600 mt-4 max-w-xl text-base leading-relaxed">
                The priorities the owner sets for the business are consistent:
                quality ahead of quantity, authenticity in what is stocked, and
                greater visibility for a business that has largely grown by word
                of mouth.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <p className="text-ink-600 mt-6 text-sm">
                1998 is the owner&rsquo;s account and has not been independently
                verified.
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
