"use client";

import WayfindingStrip from "@/components/navigation/WayfindingStrip";
import { cn } from "@/lib/utils";

type MarketingPageHeaderProps = {
  /** Breadcrumb/back colors: dark = on navy hero, light = on white/mesh sections */
  tone?: "dark" | "light";
  className?: string;
};

/**
 * Back + breadcrumbs for public marketing inner pages.
 * Sits inside the page hero (not a separate white bar under the navbar).
 */
export default function MarketingPageHeader({ tone = "dark", className }: MarketingPageHeaderProps) {
  return (
    <div className={cn("site-page-top relative z-10 mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8", className)}>
      <WayfindingStrip zone="site" tone={tone === "dark" ? "onDark" : "default"} />
    </div>
  );
}
