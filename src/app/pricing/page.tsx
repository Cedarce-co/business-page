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
            Pick a starting package.
            <br />
            We scope the rest together.
          </>
        }
        description="Choose the package closest to what you need. We confirm the scope before work begins."
        image={PRICING_HERO_IMAGE}
      />

      <PricingPackagesSection />
    </>
  );
}
