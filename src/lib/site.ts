/** Canonical site URL for metadata, Open Graph, and absolute links. No trailing slash. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://cedarce.com"
).replace(/\/$/, "");
