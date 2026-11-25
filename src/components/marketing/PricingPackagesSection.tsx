"use client";

import Link from "next/link";
import { useState } from "react";
import PricingCard from "@/components/ui/PricingCard";
import AnimatedHeadline from "@/components/motion/AnimatedHeadline";
import SectionReveal, { RevealItem, StaggerReveal } from "@/components/ui/SectionReveal";
import { PACKAGES } from "@/lib/constants";
import { isTawkConfigured, openTawkChat } from "@/lib/tawk";

type Props = {
  highlightSlug?: string;
};

function openLiveChat() {
  if (isTawkConfigured()) {
    openTawkChat();
    return;
  }
  window.dispatchEvent(new Event("open-live-chat"));
}

export default function PricingPackagesSection({ highlightSlug }: Props) {
  const initial =
    highlightSlug && PACKAGES.some((p) => p.slug === highlightSlug)
      ? highlightSlug
      : PACKAGES.find((p) => p.featured)?.slug ?? PACKAGES[0]?.slug ?? "starter";
  const [mobileSlug, setMobileSlug] = useState(initial);
  const mobilePackage = PACKAGES.find((p) => p.slug === mobileSlug) ?? PACKAGES[0];

  return (
    <SectionReveal className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <AnimatedHeadline
          text="Compare *packages*"
          className="text-center font-display text-4xl font-semibold tracking-[-0.04em] text-brand-950 lg:text-6xl"
        />
        <div className="mx-auto max-w-2xl">
          <p className="mx-auto mt-3 max-w-2xl text-center text-slate-500">
            Pick a package to start with. We agree the details with you on a short call before any work begins.
          </p>
        </div>

        {/* Mobile: one plan at a time */}
        <div className="mt-10 lg:hidden">
          <div
            role="tablist"
            aria-label="Packages"
            className="no-scrollbar flex gap-1 overflow-x-auto rounded-full border border-line bg-brand-50/60 p-1"
          >
            {PACKAGES.map((pkg) => (
              <button
                key={pkg.slug}
                type="button"
                role="tab"
                aria-selected={mobileSlug === pkg.slug}
                onClick={() => setMobileSlug(pkg.slug)}
                className={`min-h-10 flex-1 shrink-0 whitespace-nowrap rounded-full px-4 text-sm font-semibold transition ${
                  mobileSlug === pkg.slug
                    ? "bg-g-button text-white shadow-glow-sm"
                    : "text-slate-500"
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
        <StaggerReveal className="mt-14 hidden items-stretch gap-5 lg:grid lg:grid-cols-3">
          {PACKAGES.map((item) => (
            <RevealItem key={item.name}>
              <PricingCard item={item} activeSlug={highlightSlug} />
            </RevealItem>
          ))}
        </StaggerReveal>
      </div>
      <div className="mx-auto mt-10 max-w-2xl px-4">
      <p className="text-center leading-relaxed text-slate-500">
          Still confused about which category your business belongs to?{" "}
          <button
            type="button"
            onClick={openLiveChat}
            className="border-0 bg-transparent p-0 font-semibold text-brand-700 underline decoration-brand-300 underline-offset-4 transition hover:text-brand-500 hover:decoration-brand-500"
          >
            Chat us
          </button>
          {" or "}
          <Link
            href="/contact"
            className="font-semibold text-brand-700 underline decoration-brand-300 underline-offset-4 transition hover:text-brand-500 hover:decoration-brand-500"
          >
            contact support
          </Link>
          .
        </p>
        </div>
    </SectionReveal>
  );
}
