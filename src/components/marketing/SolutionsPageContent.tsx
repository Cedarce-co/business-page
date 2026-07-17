"use client";

import MarketingCatalogLayout from "@/components/marketing/MarketingCatalogLayout";
import { getMarketingCatalogEntries } from "@/lib/marketing-detail-pages";
import { DETAIL_HERO_BY_CATEGORY } from "@/lib/marketing-images";

const solutionCards = getMarketingCatalogEntries("solution");

/** Solutions index at /solutions */
export default function SolutionsPageContent() {
  return (
    <MarketingCatalogLayout
      panelImage={DETAIL_HERO_BY_CATEGORY.solution}
      eyebrow="Our solutions"
      title={
        <>
          Business{" "}
          <span className="text-cedar-accent">solutions</span>
        </>
      }
      description="Outcomes mapped to your stage — freelancers, growing teams, SMEs, and associations. Pick the situation that sounds like yours."
      cards={solutionCards}
      ctaTitle="Not sure which solution fits your stage?"
      ctaText="Book a short consultation and we will map the right path before you spend on the wrong setup."
    />
  );
}
