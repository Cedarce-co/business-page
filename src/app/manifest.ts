import type { MetadataRoute } from "next";
import { BRAND_ICON_VERSION } from "@/lib/brand-logos";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "Cedarce — Business websites, payments & automation",
    short_name: "Cedarce",
    description:
      "We set up your website, payments, invoicing, business email, and automation so your business operates like the big players.",
    lang: "en",
    dir: "ltr",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#ffffff",
    theme_color: "#111122",
    categories: ["business", "productivity"],
    icons: [
      {
        src: `/pwa-icon-192.png?v=${BRAND_ICON_VERSION}`,
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: `/pwa-icon-512.png?v=${BRAND_ICON_VERSION}`,
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: `/pwa-icon-maskable-512.png?v=${BRAND_ICON_VERSION}`,
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
