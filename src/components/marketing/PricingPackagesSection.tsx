"use client";

import PricingCard from "@/components/ui/PricingCard";
import { PACKAGES } from "@/lib/constants";

type Props = {
  highlightSlug?: string;
};

export default function PricingPackagesSection({ highlightSlug }: Props) {
  return (
    <section className="border-t border-cliq-gray-200 bg-cliq-white py-16 lg:py-20">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-black text-cliq-text-heading lg:text-3xl">Compare packages</h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-cliq-text-body">
          Pick a starting tier. We scope the rest together on a free consult before kickoff.
        </p>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {PACKAGES.map((item) => (
            <PricingCard key={item.name} item={item} activeSlug={highlightSlug} />
          ))}
        </div>
      </div>
    </section>
  );
}
