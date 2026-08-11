import MediaFrame from "@/components/media/MediaFrame";
import Reveal from "@/components/motion/Reveal";
import { Container, Eyebrow, Section } from "@/components/ui/Section";
import localBusiness from "@/data/localBusiness.json";

/**
 * Reserved slot for the owner's photograph.
 *
 * The photograph exists but has not been supplied yet, so this deliberately
 * renders the reserved state rather than a stand-in face. No stock portrait
 * and no generated likeness is used — a fake person on an "about the owner"
 * section would misrepresent the business.
 *
 * The frame reserves a 4:5 portrait, which is the ratio the real photograph
 * should be supplied in. Dropping it in means setting `src` and writing real
 * alt text here; nothing around it moves.
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
                ratio="portrait"
                sizes="(min-width: 1024px) 32vw, (min-width: 640px) 60vw, 100vw"
                reservedLabel="Owner photograph to be added"
                fallback={
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 48 48"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-ink-400 h-14 w-14"
                  >
                    <circle cx="24" cy="17" r="8" />
                    <path d="M8 42c0-8.837 7.163-16 16-16s16 7.163 16 16" />
                  </svg>
                }
              />
              <figcaption className="text-ink-600 mt-4 text-sm leading-relaxed">
                A photograph of the owner will appear here once supplied.
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
