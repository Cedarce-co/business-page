"use client";

import MarketingCatalogLayout from "@/components/marketing/MarketingCatalogLayout";
import { getMarketingCatalogEntries } from "@/lib/marketing-detail-pages";
import { PRODUCT_HERO_IMAGE } from "@/lib/marketing-images";

const productCards = getMarketingCatalogEntries("product");

/** Product catalog at /product */
export default function ProductPageContent() {
  return (
    <MarketingCatalogLayout
      panelImage={PRODUCT_HERO_IMAGE}
      eyebrow="Our products"
      title={
        <>
          Digital setup{" "}
          <span className="text-cedar-accent">products</span>
        </>
      }
      description="Websites, payments, email, invoicing, campaigns, and integrations — everything we build to make your business look credible and get paid faster."
      cards={productCards}
      ctaTitle="Need a connected setup, not separate tools?"
      ctaText="Tell us what you currently use. We will map the right product mix and launch path for your business."
    />
  );
}
