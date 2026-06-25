import type { ComponentType } from "react";
import Link from "next/link";
import { ArrowRight, Check, CreditCard, Globe, GraduationCap, Layers, Mail, MessageSquare, Receipt, Share2, Shield, Smartphone, Users, Zap } from "lucide-react";
import PricingPackagesSection from "@/components/marketing/PricingPackagesSection";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import MarketingPageHeader from "@/components/navigation/MarketingPageHeader";
import SectionReveal, { RevealItem, StaggerReveal } from "@/components/ui/SectionReveal";
import type { MarketingAccent, MarketingPageConfig, MarketingSection } from "@/lib/marketing-detail-pages";
import { marketingPagePath } from "@/lib/marketing-detail-pages";
import {
  ruledBlockTop,
  ruledCell,
  ruledGridCols,
  ruledGridColsLg,
  ruledList,
  ruledListItem,
  ruledSectionBg,
  ruledSplit,
  ruledSplitCell,
  ruledSplitTone,
} from "@/lib/ruled-layout";
import { cn } from "@/lib/utils";

const accentStyles: Record<
  MarketingAccent,
  { heroBg: string; panel: string; dot: string; ring: string }
> = {
  teal: {
    heroBg: "from-teal-950 via-cliq-navy-900 to-cliq-navy-900",
    panel: "bg-teal-500/10 border-teal-500/20",
    dot: "bg-teal-500",
    ring: "ring-teal-500/30",
  },
  purple: {
    heroBg: "from-violet-950 via-cliq-navy-900 to-cliq-navy-900",
    panel: "bg-violet-500/10 border-violet-500/20",
    dot: "bg-violet-500",
    ring: "ring-violet-500/30",
  },
  emerald: {
    heroBg: "from-emerald-950 via-cliq-navy-900 to-cliq-navy-900",
    panel: "bg-emerald-500/10 border-emerald-500/20",
    dot: "bg-emerald-500",
    ring: "ring-emerald-500/30",
  },
  amber: {
    heroBg: "from-amber-950 via-cliq-navy-900 to-cliq-navy-900",
    panel: "bg-amber-500/10 border-amber-500/20",
    dot: "bg-amber-500",
    ring: "ring-amber-500/30",
  },
  cyan: {
    heroBg: "from-cyan-950 via-cliq-navy-900 to-cliq-navy-900",
    panel: "bg-cyan-500/10 border-cyan-500/20",
    dot: "bg-cyan-500",
    ring: "ring-cyan-500/30",
  },
  rose: {
    heroBg: "from-rose-950 via-cliq-navy-900 to-cliq-navy-900",
    panel: "bg-rose-500/10 border-rose-500/20",
    dot: "bg-rose-500",
    ring: "ring-rose-500/30",
  },
};

const bentoIcons: Record<string, ComponentType<{ className?: string }>> = {
  smartphone: Smartphone,
  zap: Zap,
  layers: Layers,
  share: Share2,
  mail: Mail,
  shield: Shield,
  users: Users,
  credit: CreditCard,
  receipt: Receipt,
  globe: Globe,
  message: MessageSquare,
  graduation: GraduationCap,
};

function SectionBlock({
  section,
  accent,
  index,
}: {
  section: MarketingSection;
  accent: MarketingAccent;
  index: number;
}) {
  const a = accentStyles[accent];
  const altBg = ruledSectionBg(index);

  const sectionTitleClass = "text-center text-2xl font-black text-cliq-text-heading lg:text-3xl";
  const sectionSubtitleClass = "mx-auto mt-3 max-w-2xl text-center text-cliq-text-body";

  if (section.type === "stats") {
    return (
      <SectionReveal className={`${altBg} py-16 lg:py-20`}>
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <h2 className={sectionTitleClass}>{section.title}</h2>
          <StaggerReveal className={cn("mt-10", ruledGridColsLg(3))}>
            {section.items.map((item) => (
              <RevealItem key={item.label}>
                <div className={ruledCell}>
                  <p className="text-4xl font-black text-cliq-navy-900">{item.value}</p>
                  <p className="mt-2 text-sm text-cliq-text-body">{item.label}</p>
                </div>
              </RevealItem>
            ))}
          </StaggerReveal>
        </div>
      </SectionReveal>
    );
  }

  if (section.type === "bento") {
    return (
      <SectionReveal className={`${altBg} py-16 lg:py-20`}>
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <h2 className={sectionTitleClass}>{section.title}</h2>
          {section.subtitle ? <p className={sectionSubtitleClass}>{section.subtitle}</p> : null}
          <StaggerReveal className={cn("mt-10", ruledGridCols(2))}>
            {section.items.map((item) => {
              const Icon = bentoIcons[item.icon] ?? Layers;
              return (
                <RevealItem key={item.title}>
                  <article className={cn("group relative h-full", ruledCell)}>
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-cliq-purple-soft text-cliq-navy-800">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-cliq-text-heading">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-cliq-text-body">{item.body}</p>
                </article>
                </RevealItem>
              );
            })}
          </StaggerReveal>
        </div>
      </SectionReveal>
    );
  }

  if (section.type === "split") {
    return (
      <SectionReveal className={`${altBg} py-16 lg:py-20`}>
        <div className="mx-auto max-w-[1200px] px-4 text-center sm:px-6 lg:px-8">
          <h2 className={sectionTitleClass}>{section.title}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center leading-relaxed text-cliq-text-body">{section.body}</p>
          <div className={cn("mx-auto mt-10 max-w-xl pt-8 text-left", ruledBlockTop)}>
            <p className="text-sm font-bold uppercase tracking-wide text-cliq-text-heading">{section.panelTitle}</p>
            <ul className="mt-4 space-y-3">
              {section.panelItems.map((line) => (
                <li key={line} className="flex gap-2 text-sm text-cliq-text-body">
                  <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${a.dot}`} aria-hidden />
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionReveal>
    );
  }

  if (section.type === "timeline") {
    return (
      <SectionReveal className={`${altBg} py-16 lg:py-20`}>
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <h2 className={sectionTitleClass}>{section.title}</h2>
          <ol className="relative mx-auto mt-10 max-w-2xl space-y-8 border-l-2 border-cliq-gray-200 pl-8 text-left">
            {section.steps.map((step, i) => (
              <li key={step.title} className="relative">
                <span
                  className={`absolute -left-[2.125rem] top-1 flex h-8 w-8 items-center justify-center rounded-full text-xs font-black text-white ring-4 ring-white ${a.dot}`}
                  aria-hidden
                >
                  {i + 1}
                </span>
                <h3 className="font-bold text-cliq-text-heading">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cliq-text-body">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </SectionReveal>
    );
  }

  if (section.type === "checklist") {
    return (
      <SectionReveal className={`${altBg} py-16 lg:py-20`}>
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <h2 className={sectionTitleClass}>{section.title}</h2>
          <ul className={cn("mt-8 text-left", ruledList, section.columns === 2 ? "sm:grid sm:grid-cols-2 sm:divide-x sm:divide-y-0" : "")}>
            {section.items.map((item) => (
              <li key={item} className={cn("flex gap-3 text-sm text-cliq-text-body", ruledListItem)}>
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </SectionReveal>
    );
  }

  if (section.type === "comparison") {
    return (
      <SectionReveal className={`${altBg} py-16 lg:py-20`}>
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <h2 className={sectionTitleClass}>{section.title}</h2>
          <div className={cn("mt-10", ruledSplit)}>
            <div className={cn(ruledSplitCell, ruledSplitTone.rose)}>
              <p className="text-xs font-bold uppercase tracking-wide text-rose-800">Before</p>
              <ul className="mt-4 space-y-2">
                {section.before.map((line) => (
                  <li key={line} className="text-sm text-cliq-text-body">• {line}</li>
                ))}
              </ul>
            </div>
            <div className={cn(ruledSplitCell, ruledSplitTone.emerald)}>
              <p className="text-xs font-bold uppercase tracking-wide text-emerald-800">After Cedarce</p>
              <ul className="mt-4 space-y-2">
                {section.after.map((line) => (
                  <li key={line} className="text-sm text-cliq-text-body">• {line}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </SectionReveal>
    );
  }

  if (section.type === "pain-outcome") {
    return (
      <SectionReveal className={`${altBg} py-16 lg:py-20`}>
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className={ruledSplit}>
            <div className={cn(ruledSplitCell, ruledSplitTone.rose)}>
              <p className="text-xs font-bold uppercase tracking-wide text-rose-700">The situation</p>
              <p className="mt-4 text-lg leading-relaxed text-cliq-text-body">{section.pain}</p>
            </div>
            <div className={cn(ruledSplitCell, ruledSplitTone.emerald)}>
              <p className="text-xs font-bold uppercase tracking-wide text-emerald-800">The outcome</p>
              <p className="mt-4 text-lg leading-relaxed text-cliq-text-body">{section.outcome}</p>
            </div>
          </div>
          <ul className={cn("mt-8", ruledGridCols(2))}>
            {section.bullets.map((b) => (
              <li key={b} className={cn("flex gap-3 text-sm", ruledCell)}>
                <Check className="h-4 w-4 shrink-0 text-emerald-600" aria-hidden />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </SectionReveal>
    );
  }

  if (section.type === "quote") {
    return (
      <SectionReveal className="relative overflow-hidden bg-cliq-navy-900 py-16 lg:py-20">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-mesh-dark opacity-80" />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-xl font-medium leading-relaxed text-white/90 lg:text-2xl">&ldquo;{section.text}&rdquo;</p>
          <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-cliq-teal">{section.attribution}</p>
        </div>
      </SectionReveal>
    );
  }

  return null;
}

function Hero({ page }: { page: MarketingPageConfig }) {
  const a = accentStyles[page.accent];
  const Icon = page.icon;

  if (page.heroVariant === "split") {
    return (
      <section className="relative overflow-hidden border-b border-cliq-gray-200 bg-mesh-light">
        <div className="pointer-events-none absolute left-1/2 top-12 h-72 w-72 -translate-x-1/2 rounded-full bg-cliq-purple-soft/80 blur-3xl" aria-hidden />
        <MarketingPageHeader tone="light" className="pb-2" />
        <div className="relative mx-auto flex max-w-[1200px] flex-col items-center px-4 py-8 text-center sm:px-6 lg:px-8 lg:pb-20 lg:pt-4">
          <Badge className="uppercase tracking-wide">{page.eyebrow}</Badge>
          <h1 className="mt-4 max-w-4xl text-4xl font-black text-cliq-text-heading lg:text-5xl">{page.title}</h1>
          <p className="mt-2 max-w-3xl text-balance text-center text-xl font-semibold text-cliq-purple">{page.tagline}</p>
          <p className="mt-4 max-w-3xl text-balance text-center leading-relaxed text-cliq-text-body">{page.lead}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href={page.primaryCta.href} variant="teal" className="rounded-xl px-6 py-3 text-sm font-bold">
              {page.primaryCta.label}
            </Button>
            <Button href={page.secondaryCta.href} variant="secondary" className="rounded-xl px-6 py-3 text-sm font-bold">
              {page.secondaryCta.label}
            </Button>
          </div>
          <div className={`mx-auto mt-10 max-w-md rounded-3xl bg-gradient-to-br p-8 text-left text-white shadow-[0_28px_80px_rgba(10,10,20,0.28)] ring-1 ring-white/10 transition duration-300 hover:-translate-y-1 ${a.heroBg}`}>
            <Icon className="h-12 w-12 text-cliq-teal" aria-hidden />
            <p className="mt-6 text-sm uppercase tracking-wide text-white/60">Cedarce {page.category}</p>
            <p className="mt-2 text-2xl font-black">{page.tagline}</p>
          </div>
        </div>
      </section>
    );
  }

  if (page.heroVariant === "minimal") {
    return (
      <section className="relative overflow-hidden border-b border-cliq-gray-200 bg-white">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-dot-grid opacity-40" />
        <MarketingPageHeader tone="light" className="pb-2" />
        <div className="relative mx-auto flex max-w-[1200px] flex-col items-center px-4 py-8 text-center sm:px-6 lg:px-8 lg:pb-24 lg:pt-4">
          <div className="flex w-full max-w-3xl flex-col items-center">
            <span className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl ${a.panel}`}>
              <Icon className="h-7 w-7 text-cliq-navy-900" aria-hidden />
            </span>
            <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-cliq-text-muted">{page.eyebrow}</p>
            <h1 className="mt-2 text-4xl font-black text-cliq-text-heading lg:text-6xl">{page.title}</h1>
            <p className="mt-4 max-w-3xl text-balance text-center text-xl text-cliq-purple">{page.tagline}</p>
            <p className="mt-4 max-w-3xl text-balance text-center text-lg leading-relaxed text-cliq-text-body">{page.lead}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href={page.primaryCta.href} variant="teal" className="rounded-xl px-6 py-3 text-sm font-bold">
                {page.primaryCta.label}
              </Button>
              <Button href={page.secondaryCta.href} variant="secondary" className="rounded-xl px-6 py-3 text-sm font-bold">
                {page.secondaryCta.label}
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`relative overflow-hidden bg-gradient-to-b pb-20 ${a.heroBg}`}>
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-mesh-dark opacity-70" />
      <MarketingPageHeader tone="dark" />
      <div className="relative mx-auto flex max-w-[1200px] flex-col items-center px-4 text-center sm:px-6 lg:px-8">
        <div className="flex w-full max-w-3xl flex-col items-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
            <Icon className="h-8 w-8 text-cliq-teal" aria-hidden />
          </span>
          <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-cliq-teal">
            {page.eyebrow}
          </p>
          <h1 className="mt-3 text-4xl font-black text-white lg:text-5xl">{page.title}</h1>
          <p className="mt-3 max-w-3xl text-balance text-center text-xl font-semibold text-white/90">{page.tagline}</p>
          <p className="mt-4 max-w-3xl text-balance text-center text-base leading-relaxed text-white/75">{page.lead}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href={page.primaryCta.href} variant="onBanner" className="rounded-xl px-6 py-3 text-sm font-bold">
              {page.primaryCta.label}
            </Button>
            <Button href={page.secondaryCta.href} variant="onDark" className="rounded-xl px-6 py-3 text-sm font-bold">
              {page.secondaryCta.label}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

const PACKAGE_SLUGS = new Set(["starter", "business", "enterprise"]);

export default function MarketingDetailPage({ page }: { page: MarketingPageConfig }) {
  const highlightPackage =
    page.category === "pricing" && PACKAGE_SLUGS.has(page.slug) ? page.slug : undefined;

  return (
    <>
      <Hero page={page} />
      {page.sections.map((section, index) => (
        <SectionBlock key={`${section.type}-${index}`} section={section} accent={page.accent} index={index} />
      ))}
      {page.category === "pricing" ? <PricingPackagesSection highlightSlug={highlightPackage} /> : null}
      <SectionReveal className="border-t border-cliq-gray-200 bg-cliq-gray-100 py-16">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-xl font-black text-cliq-text-heading">
            Related{" "}
            {page.category === "product" ? "products" : page.category === "solution" ? "solutions" : "pricing options"}
          </h2>
          <div className={cn("mt-6 text-left", ruledGridCols(3))}>
            {page.related.map((r) => (
              <Link
                key={r.slug}
                href={marketingPagePath(r.category, r.slug)}
                className={cn("group flex items-center justify-between px-0 py-5 transition hover:bg-white sm:px-6 first:sm:pl-0", ruledCell)}
              >
                <span className="font-semibold text-cliq-text-heading">{r.label}</span>
                <ArrowRight className="h-4 w-4 text-cliq-navy-800 transition group-hover:translate-x-0.5" aria-hidden />
              </Link>
            ))}
          </div>
          {page.category !== "pricing" ? (
            <p className="mt-8 text-center">
              <Link href="/pricing" className="text-sm font-semibold text-cliq-navy-800 underline-offset-4 hover:underline">
                Compare packages on pricing →
              </Link>
            </p>
          ) : (
            <p className="mt-8 text-center">
              <Link href="/faq" className="text-sm font-semibold text-cliq-navy-800 underline-offset-4 hover:underline">
                Pricing FAQ →
              </Link>
            </p>
          )}
        </div>
      </SectionReveal>
    </>
  );
}
