"use client";

import WayfindingStrip from "@/components/navigation/WayfindingStrip";
import { cn } from "@/lib/utils";

type MarketingPageHeaderProps = {
  /** Kept for API compatibility; public pages are light so both tones render the same. */
  tone?: "dark" | "light";
  className?: string;
};

/** Back + breadcrumbs for public marketing inner pages, clearing the fixed navbar. */
export default function MarketingPageHeader({ className }: MarketingPageHeaderProps) {
  return (
    <div className={cn("site-page-top relative z-10 mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8", className)}>
      <WayfindingStrip zone="site" />
    </div>
  );
}
