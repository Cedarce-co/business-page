"use client";

import MarketingCatalogLayout from "@/components/marketing/MarketingCatalogLayout";
import { getMarketingCatalogEntries } from "@/lib/marketing-detail-pages";
import { PRODUCT_HERO_IMAGE } from "@/lib/marketing-images";

const productCards = getMarketingCatalogEntries("product");

/** Services catalog at /product */
export default function ProductPageContent() {
  return (
    <MarketingCatalogLayout
      panelImage={PRODUCT_HERO_IMAGE}
      eyebrow="Our services"
      title={
        <>
          Digital{" "}
          <span className="text-gradient-light">services</span>
        </>
      }
      description="Website, business email, invoices, customer messages and more. Pick what you need now and add more as you grow."
      cards={productCards}
      ctaTitle="Need more than one service?"
      ctaText="Tell us what you use today. We’ll suggest a simple mix that fits your business, with nothing extra."
    />
  );
}
