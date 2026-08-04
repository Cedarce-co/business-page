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
          <span className="text-cedar-accent">your business</span>
        </>
      }
      description="Small businesses, shops and stores (sales and inventory), medium businesses, and associations. Choose the option that feels closest to you."
      cards={solutionCards}
      ctaTitle="Not sure which setup fits?"
      ctaText="Book a short chat and we’ll point you to the right package before you spend on the wrong one."
    />
  );
}
