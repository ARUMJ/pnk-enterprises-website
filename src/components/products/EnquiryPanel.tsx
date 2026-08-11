import { ButtonLink } from "@/components/ui/Button";
import { activeEnquiryChannels } from "@/lib/enquiry";

/**
 * The site's conversion unit.
 *
 * Enquiry — not purchase — is the goal, so this panel does one job: make the
 * two confirmed channels (phone, email) obvious, and tell the user exactly
 * what each one will do before they commit to the click. That expectation
 * setting is the whole reason `outcome` exists on an enquiry channel.
 *
 * When a `categoryName` is passed, the email channel arrives pre-filled with
 * that range in the subject line, so the customer does not have to explain
 * what they were looking at.
 *
 * There is no cart and no "Buy now": nothing on this site can be transacted,
 * and pretending otherwise would mislead the customer.
 */
export default function EnquiryPanel({
  categoryName,
  heading,
  description,
  tone = "light",
  headingLevel = "h2",
  headingId,
  className,
}: {
  categoryName?: string;
  heading: string;
  description: string;
  tone?: "light" | "dark";
  headingLevel?: "h2" | "h3";
  headingId?: string;
  className?: string;
}) {
  const Heading = headingLevel;
  const channels = activeEnquiryChannels(categoryName);
  const isDark = tone === "dark";

  const wrapper = isDark
    ? "border-bone/15 bg-bone/[0.04]"
    : "border-ink-200 bg-white";
  const headingColour = isDark ? "text-bone" : "text-ink-900";
  const bodyColour = isDark ? "text-ink-200" : "text-ink-700";
  // Small supporting text: needs >= 4.5:1. ink-500 on white is only 4.88 and
  // drops below AA on bone-dark, so use ink-600 (>= 6.2:1 on every surface).
  const outcomeColour = isDark ? "text-ink-300" : "text-ink-600";

  return (
    <div
      className={["rounded-(--radius-lg) border p-7 sm:p-9", wrapper, className]
        .filter(Boolean)
        .join(" ")}
    >
      <Heading
        id={headingId}
        className={`font-display text-[clamp(1.4rem,2.4vw,1.85rem)] leading-tight ${headingColour}`}
      >
        {heading}
      </Heading>
      <p className={`mt-3 max-w-xl text-base leading-relaxed ${bodyColour}`}>
        {description}
      </p>

      <ul className="mt-7 grid gap-5 sm:grid-cols-2">
        {channels.map((channel, index) => (
          <li key={channel.id}>
            {index === 0 ? (
              <ButtonLink
                href={channel.href}
                size="lg"
                variant={isDark ? "inverse" : "primary"}
                className="w-full sm:w-auto"
              >
                {channel.label}
              </ButtonLink>
            ) : (
              <ButtonLink
                href={channel.href}
                size="lg"
                variant={isDark ? "inverseOutline" : "secondary"}
                className="w-full sm:w-auto"
              >
                {channel.label}
              </ButtonLink>
            )}
            <p className={`mt-3 text-sm leading-relaxed ${outcomeColour}`}>
              {channel.outcome}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
