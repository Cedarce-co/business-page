export const COOKIE_CONSENT_KEY = "cedarce.cookie.consent";

export type CookieConsentValue = "accepted" | "declined";

export function readCookieConsent(): CookieConsentValue | null {
  if (typeof window === "undefined") return null;
  const value = localStorage.getItem(COOKIE_CONSENT_KEY);
  return value === "accepted" || value === "declined" ? value : null;
}

export function writeCookieConsent(value: CookieConsentValue) {
  if (typeof window === "undefined") return;
  localStorage.setItem(COOKIE_CONSENT_KEY, value);
  window.dispatchEvent(new Event("cedarce:cookie-consent"));
}

export function hasAnalyticsConsent() {
  /** Optional analytics only. Live chat (Tawk) is never gated on this. */
  return readCookieConsent() === "accepted";
}

export function shouldShowCookieBanner() {
  return !readCookieConsent();
}
