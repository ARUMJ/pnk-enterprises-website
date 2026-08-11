import localBusiness from "@/data/localBusiness.json";
import { telHref } from "@/lib/contact";

/**
 * Enquiry architecture.
 *
 * The only conversion on this site is an ENQUIRY. There is no cart, no
 * checkout, no payment and no stock lookup, because the business has no
 * ecommerce backend and none was requested.
 *
 * Two channels are live today because both are confirmed business details:
 *   - phone  (the three numbers supplied by the owner)
 *   - email  (the address supplied by the owner)
 *
 * A third channel — WhatsApp — is deliberately left INACTIVE. The business has
 * not confirmed a WhatsApp number, and guessing one would send customers to a
 * number that may not be monitored. The shape below is all that is needed to
 * turn it on later: supply the number, flip `enabled`, and every enquiry
 * surface picks it up without further code changes.
 */

export type EnquiryChannelId = "phone" | "email" | "whatsapp";

export type EnquiryChannel = {
  id: EnquiryChannelId;
  /** Action label. Always a verb, so the user knows what the click does. */
  label: string;
  /** What literally happens on activation — surfaced to the user, not hidden. */
  outcome: string;
  href: string;
  enabled: boolean;
};

/** First listed number is treated as the primary line for calls. */
export const primaryPhone = localBusiness.phones[0] ?? "";

export const businessEmail = localBusiness.email;

/**
 * A pre-filled email enquiry.
 *
 * `subject` names the range the customer is looking at, and the body is a
 * short prompt rather than a fabricated order form. Nothing is asserted about
 * price, stock or delivery.
 */
export function enquiryMailto(subject: string, body?: string): string {
  const params = new URLSearchParams({ subject });
  if (body) params.set("body", body);
  return `mailto:${businessEmail}?${params.toString()}`;
}

/** Standard enquiry email for a named product range. */
export function categoryEnquiryMailto(categoryName: string): string {
  return enquiryMailto(
    `Product enquiry: ${categoryName}`,
    [
      `Hello ${localBusiness.name},`,
      "",
      `I would like information about your ${categoryName.toLowerCase()} range.`,
      "",
      "What I am looking for:",
      "",
      "Please let me know what is currently available.",
      "",
      "Thank you.",
    ].join("\n"),
  );
}

/** General enquiry email, used where no single range is in context. */
export function generalEnquiryMailto(): string {
  return enquiryMailto(
    "Product enquiry",
    [
      `Hello ${localBusiness.name},`,
      "",
      "I would like information about the products you supply.",
      "",
      "What I am looking for:",
      "",
      "Thank you.",
    ].join("\n"),
  );
}

/**
 * Channels available for a given context.
 *
 * Disabled channels are returned rather than dropped so a maintainer can see
 * exactly what is pending, but callers should render only `enabled` ones.
 */
export function enquiryChannels(categoryName?: string): EnquiryChannel[] {
  return [
    {
      id: "phone",
      label: `Call ${primaryPhone}`,
      outcome: "Opens your phone app and dials the business directly.",
      href: telHref(primaryPhone),
      enabled: Boolean(primaryPhone),
    },
    {
      id: "email",
      label: "Email an enquiry",
      outcome:
        "Opens your email app with a short message ready to send to the business.",
      href: categoryName
        ? categoryEnquiryMailto(categoryName)
        : generalEnquiryMailto(),
      enabled: true,
    },
    {
      id: "whatsapp",
      label: "Message on WhatsApp",
      outcome: "Pending: the business has not confirmed a WhatsApp number.",
      href: "",
      enabled: false,
    },
  ];
}

/** Only the channels that should actually be rendered to a customer. */
export function activeEnquiryChannels(categoryName?: string): EnquiryChannel[] {
  return enquiryChannels(categoryName).filter((channel) => channel.enabled);
}
