const APP_SHELL_PREFIXES = ["/dashboard", "/admin"];

const AUTH_PREFIXES = ["/signin", "/signup", "/forgot-password", "/reset-password"];

const NO_PUBLIC_NAVBAR_PREFIXES = [...AUTH_PREFIXES, ...APP_SHELL_PREFIXES, "/offline"];

/**
 * Public marketing routes that render the fixed `Navbar` in `RootChrome`.
 * Used to tag the marketing main wrapper (hero sections own top offset via `.site-page-top`).
 */
export function isPublicMarketingWithNavbar(pathname: string | null | undefined): boolean {
  if (!pathname) return false;
  if (pathname === "/") return false;
  if (pathname.startsWith("/request-service")) return false;
  if (NO_PUBLIC_NAVBAR_PREFIXES.some((prefix) => pathname.startsWith(prefix))) return false;
  return true;
}

/** Marketing + auth public surfaces that use the black elegant theme. */
export function isPublicDarkTheme(pathname: string | null | undefined): boolean {
  if (!pathname) return false;
  if (APP_SHELL_PREFIXES.some((prefix) => pathname.startsWith(prefix))) return false;
  return true;
}
