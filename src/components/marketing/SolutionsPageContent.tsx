"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import MarketingPageHeader from "@/components/navigation/MarketingPageHeader";
import SectionLabel from "@/components/ui/SectionLabel";
import SectionReveal, { RevealItem, StaggerReveal } from "@/components/ui/SectionReveal";
import ServiceCard from "@/components/ui/ServiceCard";
import { SERVICES } from "@/lib/constants";
import { SOLUTION_OUTCOMES, SOLUTION_SEGMENTS } from "@/lib/marketing-pages";
import {
  ruledCell,
  ruledGridCols,
  ruledGridColsLg,
  ruledSplit,
  ruledSplitCell,
  ruledSplitTone,
} from "@/lib/ruled-layout";
import { cn } from "@/lib/utils";

export default function SolutionsPageContent() {
  return (
    <>
      <section className="relative overflow-hidden bg-cliq-navy-900 pb-20">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-mesh-dark opacity-90" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-dot-grid opacity-[0.08]"
        />
        <MarketingPageHeader tone="dark" />
        <div className="relative mx-auto flex max-w-[1200px] flex-col items-center px-4 text-center sm:px-6 lg:px-8">
          <SectionLabel className="border border-white/10 bg-white/10 text-white/90 backdrop-blur-sm">Solutions</SectionLabel>
          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-black text-white sm:text-5xl lg:text-6xl">
            Outcomes for your stage, not a generic service list.
          </h1>
          <p className="mt-5 max-w-3xl text-balance text-center text-lg text-white/75">
            Whether you are launching solo or running a team, pick the business situation that matches yours. We map
            the right mix of web, payments, email, and campaigns.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {SOLUTION_SEGMENTS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                {s.title.split(" ")[0]}…
              </a>
            ))}
          </div>
        </div>
      </section>

      <SectionReveal className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-[1200px] px-4 text-center sm:px-6 lg:px-8">
          <SectionLabel className="mx-auto">By business type</SectionLabel>
          <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-black text-cliq-text-heading lg:text-4xl">
            Start with the problem you are solving today.
          </h2>
          <StaggerReveal className={cn("mt-10", ruledGridColsLg(2))}>
            {SOLUTION_SEGMENTS.map((s) => (
              <RevealItem key={s.id}>
              <article
                id={s.id}
                className={cn("scroll-mt-28", ruledCell)}
              >
                <h3 className="text-xl font-black text-cliq-text-heading">{s.title}</h3>
                <div className={cn("mt-5", ruledSplit)}>
                  <div className={cn(ruledSplitCell, ruledSplitTone.rose)}>
                    <p className="text-xs font-bold uppercase tracking-wide text-rose-700">The pain</p>
                    <p className="mt-2 text-sm leading-relaxed text-cliq-text-body">{s.pain}</p>
                  </div>
                  <div className={cn(ruledSplitCell, ruledSplitTone.emerald)}>
                    <p className="text-xs font-bold uppercase tracking-wide text-emerald-800">The outcome</p>
                    <p className="mt-2 text-sm leading-relaxed text-cliq-text-body">{s.outcome}</p>
                  </div>
                </div>
                <Link
                  href={s.href}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-cliq-navy-900 underline-offset-4 hover:underline"
                >
                  {s.cta}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </article>
              </RevealItem>
            ))}
          </StaggerReveal>
        </div>
      </SectionReveal>

      <SectionReveal className="border-y border-cliq-gray-200 bg-cliq-gray-50 py-16 lg:py-24">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-black text-cliq-text-heading lg:text-4xl">Three jobs we get hired for</h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-cliq-text-body">
            Most clients need one of these outcomes first, then expand the stack over time.
          </p>
          <StaggerReveal className={cn("mt-10", ruledGridCols(3))}>
            {SOLUTION_OUTCOMES.map((o) => (
              <RevealItem key={o.title}>
              <Link
                href={o.href}
                className={cn("group block h-full transition hover:bg-white", ruledCell)}
              >
                <h3 className="text-xl font-black text-cliq-text-heading">{o.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-cliq-text-body">{o.desc}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-cliq-navy-900">
                  Explore
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden />
                </span>
              </Link>
              </RevealItem>
            ))}
          </StaggerReveal>
        </div>
      </SectionReveal>

      <SectionReveal className="bg-cliq-white py-16 lg:py-24">
        <div className="mx-auto max-w-[1200px] px-4 text-center sm:px-6 lg:px-8">
          <SectionLabel className="mx-auto">Service pillars</SectionLabel>
          <h2 className="mt-4 text-3xl font-black text-cliq-text-heading lg:text-4xl">Pick a pillar to go deeper</h2>
          <p className="mx-auto mt-3 max-w-xl text-cliq-text-body">
            Each pillar has a dedicated page with deliverables, who it&apos;s for, and how to start.
          </p>
          <Button href="/contact" variant="secondary" className="mt-6 rounded-xl px-6 py-3 text-sm font-bold">
            Not sure? Talk to us
          </Button>
          <StaggerReveal className={cn("mt-10", ruledGridCols(3))}>
            {SERVICES.map((service) => (
              <RevealItem key={service.id}>
                <ServiceCard service={service} />
              </RevealItem>
            ))}
          </StaggerReveal>
        </div>
      </SectionReveal>

      <section className="relative overflow-hidden bg-cliq-navy-900 py-16 lg:py-20">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-mesh-dark opacity-80" />
        <div className="relative mx-auto max-w-[1200px] px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-white lg:text-4xl">Want to see the platform behind delivery?</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/70">
            Solutions describe what we solve. The Product page shows how Cedarce runs verification, requests, and admin
            operations as software.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/about" variant="onDark" className="rounded-xl px-6 py-3 text-sm font-bold">
              View product
            </Button>
            <Button href="/signup" variant="teal" className="rounded-xl px-6 py-3 text-sm font-bold">
              Create account
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
