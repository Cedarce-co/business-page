/** Public support contact - use everywhere we show how to reach the team. */
export const SUPPORT_EMAIL = "support@cedarce.com";

/** Human-readable (with spaces). */
export const SUPPORT_PHONE_DISPLAY = "+234 0706 5617 965";

/** For `tel:` links - digits only with country code. */
export const SUPPORT_PHONE_TEL = "+2347065617965";

export const OFFICE_ADDRESS = "By appointment - contact us for the full address";

export const OFFICE_HOURS = "10am to 7pm, Monday to Friday";

export const OFFICE_HOURS_SHORT = "Mon-Fri, 10am-7pm";

/** WhatsApp - the main way prospects reach us (same line as support phone). */
export const WHATSAPP_NUMBER = "2347065617965";

export const WHATSAPP_DEFAULT_MESSAGE =
  "Hi Cedarce, I'd like to talk about setting up my business online.";

export function whatsappUrl(message: string = WHATSAPP_DEFAULT_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
