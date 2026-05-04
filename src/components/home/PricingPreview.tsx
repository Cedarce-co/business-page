import SectionLabel from "@/components/ui/SectionLabel";
import SectionIntro from "@/components/ui/SectionIntro";
import PricingCard from "@/components/ui/PricingCard";
import { PACKAGES } from "@/lib/constants";

export default function PricingPreview() {
  return (
    <section className="bg-cliq-white py-20 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <SectionIntro>
          <SectionLabel className="bg-cliq-purple-soft text-cliq-purple">Packages</SectionLabel>
          <h2 className="mt-5 text-4xl font-black text-cliq-text-heading lg:text-5xl">
            Clear tiers. Setup scoped to what you need.
          </h2>
          <p className="mt-4 text-lg text-cliq-text-body">
            Pick a starting tier; we scope the rest with you. No hidden fees. No drama.
          </p>
        </SectionIntro>
        <div className="mt-12 -mx-4 overflow-x-auto overscroll-x-contain px-4 pb-1 snap-x snap-mandatory lg:mx-0 lg:overflow-visible lg:px-0 lg:pb-0 lg:snap-none">
          <div className="flex w-max gap-4 lg:w-full lg:grid lg:grid-cols-3 lg:gap-6">
            {PACKAGES.map((item) => (
              <div
                key={item.name}
                className="w-[min(88vw,340px)] shrink-0 snap-start lg:w-auto lg:min-w-0 lg:snap-normal"
              >
                <PricingCard item={item} />
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12">
        <p className="mt-16 text-center text-sm text-cliq-text-muted sm:mt-20 lg:mt-24">
          Not sure where to start?{" "}
          <a href="/contact" className="font-medium text-cliq-purple underline underline-offset-2">
            Book a free consultation →
          </a>
          {" · "}
          No pressure. Just clarity.
        </p>
        </div>
      </div>
    </section>
  );
}
