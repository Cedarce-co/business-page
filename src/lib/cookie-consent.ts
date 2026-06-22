export const COOKIE_CONSENT_KEY = "cedarce.cookie.consent";
export const COOKIE_DISMISS_SESSION_KEY = "cedarce.cookie.dismissed";

export type CookieConsentValue = "accepted" | "declined";

export function readCookieConsent(): CookieConsentValue | null {
  if (typeof window === "undefined") return null;
  const value = localStorage.getItem(COOKIE_CONSENT_KEY);
  return value === "accepted" || value === "declined" ? value : null;
}

export function writeCookieConsent(value: CookieConsentValue) {
  if (typeof window === "undefined") return;
  localStorage.setItem(COOKIE_CONSENT_KEY, value);
  sessionStorage.removeItem(COOKIE_DISMISS_SESSION_KEY);
  window.dispatchEvent(new Event("cedarce:cookie-consent"));
}

export function dismissCookieBannerForSession() {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(COOKIE_DISMISS_SESSION_KEY, "1");
}

export function isCookieBannerDismissedThisSession() {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(COOKIE_DISMISS_SESSION_KEY) === "1";
}

export function hasAnalyticsConsent() {
  return readCookieConsent() === "accepted";
}

export function shouldShowCookieBanner() {
  if (readCookieConsent()) return false;
  if (isCookieBannerDismissedThisSession()) return false;
  return true;
}
