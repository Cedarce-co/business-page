import PageHero from "@/components/marketing/PageHero";
import PricingPackagesSection from "@/components/marketing/PricingPackagesSection";
import { PRICING_HERO_IMAGE } from "@/lib/marketing-images";

export default function PricingPage() {
  return (
    <>
      <PageHero
        badge="Pricing"
        title={
          <>
            Clear prices in Naira.
            <br />
            <span className="text-gradient-light">No surprises.</span>
          </>
        }
        description="Small Business and Medium Business show a starting price up front. Enterprise is priced after a short call. You see the price before you commit."
        image={PRICING_HERO_IMAGE}
      />

      <PricingPackagesSection />
    </>
  );
}
