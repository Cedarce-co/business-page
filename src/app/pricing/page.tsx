import Link from "next/link";
import PageHero from "@/components/marketing/PageHero";
import PricingPackagesSection from "@/components/marketing/PricingPackagesSection";
import FinalCTASection from "@/components/home/FinalCTASection";

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
      />

      <PricingPackagesSection />

      <section className="border-t border-cliq-gray-200 bg-cliq-gray-100 py-12">
        <div className="mx-auto max-w-[1200px] px-4 text-center sm:px-6 lg:px-8">
          <p className="text-cliq-text-body">
            Have questions?{" "}
            <Link href="/faq" className="font-semibold text-cliq-navy-800 underline-offset-4 hover:underline">
              Read our FAQ
            </Link>{" "}
            or{" "}
            <Link href="/contact" className="font-semibold text-cliq-navy-800 underline-offset-4 hover:underline">
              book a consult
            </Link>
            .
          </p>
        </div>
      </section>

      <FinalCTASection />
    </>
  );
}
