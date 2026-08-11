/**
 * Contact-link helpers.
 *
 * Nigerian numbers are stored in local `0…` form in the business source of
 * truth. For `tel:` links we emit E.164 (+234…) so the link dials correctly
 * from outside Nigeria, while the visible text keeps the familiar local form.
 */
const NG_COUNTRY_CODE = "+234";

/** Converts a stored local number into an E.164 `tel:` href. */
export function telHref(localNumber: string): string {
  const digits = localNumber.replace(/\D/g, "");
  const national = digits.startsWith("0") ? digits.slice(1) : digits;
  return `tel:${NG_COUNTRY_CODE}${national}`;
}

/** E.164 form without the `tel:` scheme — used for structured data. */
export function toE164(localNumber: string): string {
  return telHref(localNumber).replace("tel:", "");
}
