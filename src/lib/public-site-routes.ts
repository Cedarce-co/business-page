const NO_PUBLIC_NAVBAR_PREFIXES = ["/signin", "/signup", "/dashboard", "/admin", "/offline"];

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
