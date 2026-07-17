import Link from "next/link";
import PageHero from "@/components/marketing/PageHero";
import SectionReveal from "@/components/ui/SectionReveal";
import PricingPackagesSection from "@/components/marketing/PricingPackagesSection";
import FinalCTASection from "@/components/home/FinalCTASection";
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
        description="How much business have you lost because you didn't look credible online? Pick a tier; we scope the rest. No hidden fees. No drama."
        image={PRICING_HERO_IMAGE}
      />

      <PricingPackagesSection />

      <SectionReveal className="border-t border-white/10 bg-zinc-950 py-12">
        <div className="mx-auto max-w-[1200px] px-4 text-center sm:px-6 lg:px-8">
          <p className="text-cedar-mist">
            Have questions?{" "}
            <Link href="/faq" className="font-semibold text-cedar-accent underline-offset-4 hover:underline">
              Read our FAQ
            </Link>{" "}
            or{" "}
            <Link href="/contact" className="font-semibold text-cedar-accent underline-offset-4 hover:underline">
              book a consult
            </Link>
            .
          </p>
        </div>
      </SectionReveal>

      <FinalCTASection />
    </>
  );
}
