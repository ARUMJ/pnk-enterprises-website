import MediaFrame from "@/components/media/MediaFrame";
import Reveal from "@/components/motion/Reveal";
import { Container, Eyebrow, Section } from "@/components/ui/Section";
import localBusiness from "@/data/localBusiness.json";

/**
 * The owner's photograph.
 *
 * This is the client's own professional photograph, supplied and approved by
 * him, and it is used **as photographed**. Nothing in it is generated: not the
 * face, not the wardrobe, not the background, not the lighting. The only
 * processing applied was deterministic encoding — PNG to WebP and JPEG at
 * quality 92, metadata stripped, no resize and no crop (RMSE 0.0072 against
 * the source, which is encoder noise).
 *
 * This replaced an AI-composited portrait that had been built in earlier
 * phases, when the only image available was a casual outdoor snapshot. That
 * composite is gone. Do not reintroduce it, and do not "improve" this
 * photograph with a generative model — see §18C of `docs/PROJECT_STATE.md`.
 *
 * The source is 922x1152, which is 4:5 to within half a pixel, so the frame
 * shows essentially the whole photograph as composed. `objectPosition` pins
 * the crop to the top so that any future rounding is taken from the jacket
 * rather than from his head.
 *
 * The photograph is deliberately NOT wrapped in `<Reveal>`, while the copy
 * beside it still is. The client's identity photograph is content, not
 * decorative motion, so it must never depend on an animation lifecycle to
 * become visible: not on IntersectionObserver firing, not on client-side
 * navigation timing, not on how fast the reveal island hydrates, and not on
 * any mobile browser quirk. Text can animate in; his face may not be held
 * back waiting for it. Do not re-wrap this figure in `Reveal`.
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
          <figure>
            <MediaFrame
              src="/images/owner/owner-portrait.webp"
              alt={`The owner of ${localBusiness.name}, in a navy suit, white shirt and navy tie, photographed from the chest up.`}
              ratio="portrait"
              sizes="(min-width: 1024px) 32vw, (min-width: 640px) 60vw, 100vw"
              objectPosition="50% 0%"
              quality={90}
            />
            <figcaption className="text-ink-600 mt-4 text-sm leading-relaxed">
              The owner of {localBusiness.name}.
            </figcaption>
          </figure>

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
