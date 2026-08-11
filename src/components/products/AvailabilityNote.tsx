import { availabilityNote } from "@/lib/products";

/**
 * Stock honesty notice.
 *
 * The business has not supplied inventory data, and a category page could
 * easily be read as "all of this is in stock right now". This states plainly
 * that availability varies and that the customer should confirm before
 * travelling — which is both accurate and, practically, a conversion prompt.
 *
 * It is a `<p>` inside the normal flow rather than an alert role: it is
 * standing context, not a live or urgent message.
 */
export default function AvailabilityNote({
  className,
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "dark";
}) {
  const isDark = tone === "dark";

  return (
    <p
      className={[
        "flex gap-3 rounded-(--radius-md) border p-4 text-sm leading-relaxed",
        isDark
          ? "border-bone/15 bg-bone/[0.04] text-ink-300"
          : "border-brass-200 bg-brass-50 text-ink-700",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span
        aria-hidden="true"
        className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${
          isDark ? "bg-brass-400" : "bg-brass-500"
        }`}
      />
      <span>{availabilityNote}</span>
    </p>
  );
}
