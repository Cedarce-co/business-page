/*
  ┌─────────────────────────────────────────────────────────┐
  │  CEDARCE COLOUR REFERENCE — paste in every component   │
  └─────────────────────────────────────────────────────────┘
*/
import SectionLabel from "@/components/ui/SectionLabel";
import PricingCard from "@/components/ui/PricingCard";
import { PACKAGES } from "@/lib/constants";

export default function PricingPreview() {
  return (
    <section className="bg-cliq-white py-20 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <SectionLabel className="bg-cliq-purple-soft text-cliq-purple">Simple Pricing</SectionLabel>
        <h2 className="mt-5 text-4xl font-black text-cliq-text-heading lg:text-5xl">
          Transparent pricing.
          <br />
          No surprises.
        </h2>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {PACKAGES.map((item) => (
            <PricingCard key={item.name} item={item} />
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-cliq-text-muted">
          Not sure which package?{" "}
          <a href="/contact" className="font-medium text-cliq-purple underline">
            Book a free consultation →
          </a>{" "}
          No pressure, no jargon.
        </p>
      </div>
    </section>
  );
}
