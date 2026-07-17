"use client";

import { useState } from "react";
import PricingCard from "@/components/ui/PricingCard";
import SectionReveal, { RevealItem, StaggerReveal } from "@/components/ui/SectionReveal";
import { PACKAGES } from "@/lib/constants";

type Props = {
  highlightSlug?: string;
};

export default function PricingPackagesSection({ highlightSlug }: Props) {
  const initial =
    highlightSlug && PACKAGES.some((p) => p.slug === highlightSlug)
      ? highlightSlug
      : PACKAGES.find((p) => p.featured)?.slug ?? PACKAGES[0]?.slug ?? "starter";
  const [mobileSlug, setMobileSlug] = useState(initial);
  const mobilePackage = PACKAGES.find((p) => p.slug === mobileSlug) ?? PACKAGES[0];

  return (
    <SectionReveal className="border-t border-white/10 bg-black py-16 lg:py-20">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <h2 className="text-center font-display text-3xl text-cedar-ivory lg:text-4xl">
          Compare packages
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-cedar-mist">
          Pick a starting tier. We scope the rest together on a free consult before kickoff.
        </p>

        {/* Mobile: one plan at a time */}
        <div className="mt-10 lg:hidden">
          <div
            role="tablist"
            aria-label="Packages"
            className="flex gap-2 overflow-x-auto pb-2"
          >
            {PACKAGES.map((pkg) => (
              <button
                key={pkg.slug}
                type="button"
                role="tab"
                aria-selected={mobileSlug === pkg.slug}
                onClick={() => setMobileSlug(pkg.slug)}
                className={`min-h-11 shrink-0 rounded-lg px-4 text-sm font-semibold transition ${
                  mobileSlug === pkg.slug
                    ? "bg-cedar-accent text-black"
                    : "border border-white/15 text-cedar-mist"
                }`}
              >
                {pkg.name}
              </button>
            ))}
          </div>
          <div className="mt-4">
            {mobilePackage ? <PricingCard item={mobilePackage} activeSlug={highlightSlug} /> : null}
          </div>
        </div>

        {/* Desktop: 3-up comparison */}
        <StaggerReveal className="mt-12 hidden gap-6 lg:grid lg:grid-cols-3">
          {PACKAGES.map((item) => (
            <RevealItem key={item.name}>
              <PricingCard item={item} activeSlug={highlightSlug} />
            </RevealItem>
          ))}
        </StaggerReveal>
      </div>
    </SectionReveal>
  );
}
