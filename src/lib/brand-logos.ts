/** Bump when favicon / PWA icon files in /public are regenerated. */
export const BRAND_ICON_VERSION = "5";

/** Brand logo assets under /public/assets/logo */
export const BRAND_LOGOS = {
  black: {
    full: "/assets/logo/logoblacktext.png",
    fullTransparent: "/assets/logo/logoblacktext-transparent.png",
    mobile: "/assets/logo/logoblackmobile.png",
    mobileTransparent: "/assets/logo/logoblackmobile-transaparent.png",
  },
  white: {
    full: "/assets/logo/logowhitetext.png",
    fullTransparent: "/assets/logo/logowhitetext-transparent.png",
    mobile: "/assets/logo/logowhitemobile.png",
    mobileTransparent: "/assets/logo/logowhitemobile-transparent.png",
  },
} as const;

/** Navbar, footer, and other light backgrounds */
export const LOGO_LIGHT_BG = {
  mobile: BRAND_LOGOS.black.mobileTransparent,
  desktop: BRAND_LOGOS.black.fullTransparent,
} as const;

/** Dark navy sections (hero overlays, etc.) */
export const LOGO_DARK_BG = {
  mobile: BRAND_LOGOS.white.mobileTransparent,
  desktop: BRAND_LOGOS.white.fullTransparent,
} as const;

/** Source file dimensions (aspect ratio for Next/Image). */
export const LOGO_INTRINSIC = {
  mobileMark: { width: 508, height: 491 },
  desktopWordmark: { width: 1011, height: 247 },
} as const;

function displaySize(
  height: number,
  intrinsic: { width: number; height: number }
): { width: number; height: number } {
  return {
    width: Math.round((height * intrinsic.width) / intrinsic.height),
    height,
  };
}

/** Rendered logo size in the site header. */
export const LOGO_NAV_SIZES = {
  mobile: displaySize(32, LOGO_INTRINSIC.mobileMark),
  desktop: displaySize(36, LOGO_INTRINSIC.desktopWordmark),
  desktopLg: displaySize(40, LOGO_INTRINSIC.desktopWordmark),
} as const;

/** Rendered logo size in the site footer. */
export const LOGO_FOOTER_SIZES = {
  mobile: displaySize(32, LOGO_INTRINSIC.mobileMark),
  desktop: displaySize(36, LOGO_INTRINSIC.desktopWordmark),
} as const;
