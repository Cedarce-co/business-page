const NO_PUBLIC_NAVBAR_PREFIXES = ["/signin", "/signup", "/dashboard", "/admin"];

/**
 * Public marketing routes that render the fixed `Navbar` in `RootChrome`.
 * Used for main padding and the global wayfinding strip under the header.
 */
export function isPublicMarketingWithNavbar(pathname: string | null | undefined): boolean {
  if (!pathname) return false;
  if (pathname === "/") return false;
  if (pathname.startsWith("/request-service")) return false;
  if (NO_PUBLIC_NAVBAR_PREFIXES.some((prefix) => pathname.startsWith(prefix))) return false;
  return true;
}
