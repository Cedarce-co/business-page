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
            Packages as low as you need to start.
            <br />
            We confirm details together.
          </>
        }
        description="Small Business and Medium Business show a clear as-low-as price in your currency. Enterprise is custom. You tell us what you need and we quote."
        image={PRICING_HERO_IMAGE}
      />

      <PricingPackagesSection />
    </>
  );
}
