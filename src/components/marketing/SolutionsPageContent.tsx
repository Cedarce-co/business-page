"use client";

import MarketingCatalogLayout from "@/components/marketing/MarketingCatalogLayout";
import { getMarketingCatalogEntries } from "@/lib/marketing-detail-pages";
import { DETAIL_HERO_BY_CATEGORY } from "@/lib/marketing-images";

const solutionCards = getMarketingCatalogEntries("solution");

/** Business types index at /solutions */
export default function SolutionsPageContent() {
  return (
    <MarketingCatalogLayout
      panelImage={DETAIL_HERO_BY_CATEGORY.solution}
      eyebrow="Who we help"
      title={
        <>
          Built for{" "}
          <span className="text-gradient-light">your business</span>
        </>
      }
      description="Small businesses, shops and stores, growing businesses, and associations. Pick the one that sounds most like you."
      cards={solutionCards}
      ctaTitle="Not sure which setup fits?"
      ctaText="Have a short chat with us and we’ll point you to the right package before you spend money on the wrong one."
    />
  );
}
