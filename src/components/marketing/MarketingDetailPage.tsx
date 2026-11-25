import type { ComponentType } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Check,
  CreditCard,
  Globe,
  GraduationCap,
  Layers,
  Mail,
  MessageSquare,
  Receipt,
  Share2,
  Shield,
  Smartphone,
  Users,
  Zap,
} from "lucide-react";
import PricingPackagesSection from "@/components/marketing/PricingPackagesSection";
import MobileSnapRail from "@/components/marketing/MobileSnapRail";
import CurrencyAwareEyebrow from "@/components/marketing/CurrencyAwareEyebrow";
import Button from "@/components/ui/Button";
import MarketingPageHeader from "@/components/navigation/MarketingPageHeader";
import AnimatedHeadline from "@/components/motion/AnimatedHeadline";
import Reveal from "@/components/motion/Reveal";
import SectionReveal, { RevealItem, StaggerReveal } from "@/components/ui/SectionReveal";
import type { MarketingAccent, MarketingPageConfig, MarketingSection } from "@/lib/marketing-detail-pages";
import { CATALOG_CARD_IMAGES, DETAIL_HERO_BY_CATEGORY } from "@/lib/marketing-images";
import { cn } from "@/lib/utils";

const accentStyles: Record<MarketingAccent, { panel: string; dot: string }> = {
  teal: { panel: "bg-brand-50 border-brand-200", dot: "bg-brand-600" },
  purple: { panel: "bg-brand-50 border-line", dot: "bg-brand-600" },
  emerald: { panel: "bg-brand-50 border-brand-200", dot: "bg-brand-600" },
  amber: { panel: "bg-brand-50 border-brand-200", dot: "bg-brand-600" },
  cyan: { panel: "bg-brand-50 border-line", dot: "bg-brand-600" },
  rose: { panel: "bg-brand-50 border-line", dot: "bg-brand-600" },
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

function ElegantCard({
  href,
  title,
  body,
  icon: Icon,
  compact = false,
}: {
  href?: string;
  title: string;
  body: string;
  icon?: ComponentType<{ className?: string }>;
  compact?: boolean;
}) {
  const content = (
    <>
      {Icon ? (
        <div
          className={cn(
            "btn-sheen flex items-center justify-center rounded-2xl bg-g-button text-white shadow-glow-sm transition duration-500 group-hover:-rotate-6 group-hover:scale-105",
            compact ? "mb-4 h-10 w-10" : "mb-6 h-12 w-12",
          )}
        >
          <Icon className={cn(compact ? "h-4 w-4" : "h-5 w-5", "text-white")} aria-hidden />
        </div>
      ) : null}
      <h3 className={cn("font-semibold tracking-tight text-brand-950", compact ? "text-base" : "text-xl")}>{title}</h3>
      <p
        className={cn(
          "mt-2 flex-1 text-sm text-slate-500",
          compact ? "line-clamp-4 leading-6" : "mt-3 leading-7",
        )}
      >
        {body}
      </p>
      {href ? (
        <span
          className={cn(
            "inline-flex items-center gap-2 font-semibold text-brand-600",
            compact ? "mt-4" : "mt-7 text-sm",
          )}
        >
          {compact ? (
            <ArrowRight className="h-4 w-4" aria-hidden />
          ) : (
            <>
              Learn more
              <ArrowRight className="h-4 w-4 transition duration-200 group-hover:translate-x-1" aria-hidden />
            </>
          )}
        </span>
      ) : null}
    </>
  );

  const className = cn(
    "group relative flex h-full flex-col overflow-hidden border border-line bg-white shadow-soft transition duration-500",
    compact
      ? "min-h-[11.5rem] rounded-3xl p-5 active:scale-[0.98]"
      : "min-h-[180px] rounded-[2rem] p-7 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift",
  );

  if (href) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }

  return <article className={className}>{content}</article>;
}

function SectionIntro({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="max-w-2xl text-left">
      <AnimatedHeadline
        text={title}
        className="font-display text-[2rem] font-semibold leading-[1.05] tracking-[-0.04em] text-brand-950 sm:text-4xl lg:text-5xl"
      />
      {subtitle ? (
        <Reveal delay={0.1}>
          <p className="mt-4 text-[15px] leading-relaxed text-slate-500 sm:text-base lg:text-lg">{subtitle}</p>
        </Reveal>
      ) : null}
    </div>
  );
}

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
  const altBg = index % 2 === 0 ? "bg-white" : "bg-gradient-to-b from-brand-50/70 to-white";

  if (section.type === "stats") {
    return (
      <SectionReveal className={`${altBg} py-12 lg:py-24`}>
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <SectionIntro title={section.title} />
          {/* Mobile: compact metric strip */}
          <div className="mt-6 grid grid-cols-3 gap-2 lg:hidden">
            {section.items.map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-line bg-white px-2 py-3 text-center"
              >
                <p className="font-display text-xl font-semibold text-gradient sm:text-2xl">{item.value}</p>
                <p className="mt-1 text-[10px] leading-snug text-slate-500 sm:text-xs">{item.label}</p>
              </div>
            ))}
          </div>
          <StaggerReveal className="mt-12 hidden gap-4 sm:grid-cols-3 lg:grid">
            {section.items.map((item) => (
              <RevealItem key={item.label}>
                <div className="rounded-[2rem] border border-line bg-white shadow-soft p-7 text-left">
                  <p className="font-display text-4xl font-semibold tracking-[-0.04em] text-gradient lg:text-5xl">{item.value}</p>
                  <p className="mt-3 text-sm text-slate-500">{item.label}</p>
                </div>
              </RevealItem>
            ))}
          </StaggerReveal>
        </div>
      </SectionReveal>
    );
  }

  if (section.type === "bento") {
    const left = section.items.filter((_, i) => i % 2 === 0);
    const right = section.items.filter((_, i) => i % 2 === 1);

    return (
      <SectionReveal preserveSticky className={`${altBg} py-12 lg:py-24`}>
        <div className="relative mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-16">
            <div className="lg:sticky lg:top-[calc(var(--site-nav-height)+2rem)]">
              <SectionIntro title={section.title} subtitle={section.subtitle} />
            </div>

            <div>
              <MobileSnapRail
                slides={section.items.map((item) => (
                  <ElegantCard
                    key={item.title}
                    title={item.title}
                    body={item.body}
                    icon={bentoIcons[item.icon] ?? Layers}
                    compact
                  />
                ))}
              />

              <div className="hidden gap-6 lg:grid lg:grid-cols-2">
                <div className="flex flex-col gap-6 lg:pt-16">
                  {left.map((item) => (
                    <ElegantCard
                      key={item.title}
                      title={item.title}
                      body={item.body}
                      icon={bentoIcons[item.icon] ?? Layers}
                    />
                  ))}
                </div>
                <div className="flex flex-col gap-6">
                  {right.map((item) => (
                    <ElegantCard
                      key={item.title}
                      title={item.title}
                      body={item.body}
                      icon={bentoIcons[item.icon] ?? Layers}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionReveal>
    );
  }

  if (section.type === "split") {
    return (
      <SectionReveal preserveSticky className={`${altBg} py-12 lg:py-24`}>
        <div className="mx-auto grid max-w-[1200px] items-start gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <div className="lg:sticky lg:top-[calc(var(--site-nav-height)+2rem)]">
            <SectionIntro title={section.title} subtitle={section.body} />
          </div>
          <div className="rounded-2xl border border-line bg-white p-5 sm:rounded-[1.75rem] sm:p-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-brand-600 sm:text-xs">
              {section.panelTitle}
            </p>
            <ul className="mt-4 space-y-3 sm:mt-6 sm:space-y-4">
              {section.panelItems.map((line) => (
                <li key={line} className="flex gap-3 text-sm leading-relaxed text-slate-500">
                  <span className={cn("mt-2 h-1.5 w-1.5 shrink-0 rounded-full", a.dot)} aria-hidden />
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
      <SectionReveal className={`${altBg} py-12 lg:py-24`}>
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <SectionIntro title={section.title} />

          <MobileSnapRail
            className="mt-6"
            cardWidthVw={72}
            slides={section.steps.map((step, i) => (
              <article
                key={step.title}
                className="flex h-full min-h-[11rem] flex-col rounded-2xl border border-line bg-white p-5"
              >
                <span className="btn-sheen inline-flex h-9 w-9 items-center justify-center rounded-xl bg-g-button text-xs font-semibold text-white">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-base font-bold text-brand-950">{step.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-slate-500">{step.body}</p>
              </article>
            ))}
          />

          <div className="mt-12 hidden gap-4 lg:grid lg:grid-cols-3">
            {section.steps.map((step, i) => (
              <article
                key={step.title}
                className="rounded-[2rem] border border-line bg-white shadow-soft p-7"
              >
                <span className="btn-sheen inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-g-button text-sm font-semibold text-white shadow-glow-sm">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 text-xl font-bold text-brand-950">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-500">{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </SectionReveal>
    );
  }

  if (section.type === "checklist") {
    return (
      <SectionReveal className={`${altBg} py-12 lg:py-24`}>
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <SectionIntro title={section.title} />
          <ul className="mt-6 grid grid-cols-1 gap-2.5 sm:mt-10 sm:grid-cols-2 sm:gap-3">
            {section.items.map((item) => (
              <li
                key={item}
                className="flex gap-3 rounded-xl border border-line bg-white px-4 py-3.5 text-sm text-slate-500 sm:rounded-2xl sm:px-5 sm:py-4"
              >
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden />
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
      <SectionReveal className={`${altBg} py-12 lg:py-24`}>
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <SectionIntro title={section.title} />

          <MobileSnapRail className="mt-6" cardWidthVw={82}>
            <div className="h-full rounded-2xl border border-line bg-white p-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-400">Before</p>
              <ul className="mt-4 space-y-3">
                {section.before.map((line) => (
                  <li key={line} className="text-sm leading-relaxed text-slate-500">
                    {line}
                  </li>
                ))}
              </ul>
            </div>
            <div className="h-full rounded-2xl border border-brand-200 bg-brand-50 p-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-brand-600">
                After Cedarce
              </p>
              <ul className="mt-4 space-y-3">
                {section.after.map((line) => (
                  <li key={line} className="flex gap-2 text-sm leading-relaxed text-brand-950">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </MobileSnapRail>

          <div className="mt-12 hidden gap-5 lg:grid lg:grid-cols-2">
            <div className="rounded-[2rem] border border-line bg-white shadow-soft p-7 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Before</p>
              <ul className="mt-6 space-y-4">
                {section.before.map((line) => (
                  <li key={line} className="text-sm leading-relaxed text-slate-500">
                    {line}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[2rem] border border-brand-200 bg-brand-50 p-7 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-600">
                After Cedarce
              </p>
              <ul className="mt-6 space-y-4">
                {section.after.map((line) => (
                  <li key={line} className="flex gap-3 text-sm leading-relaxed text-brand-950">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden />
                    {line}
                  </li>
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
      <SectionReveal className={`${altBg} py-12 lg:py-24`}>
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <MobileSnapRail cardWidthVw={84}>
            <div className="h-full rounded-2xl border border-line bg-white p-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-400">
                The situation
              </p>
              <p className="mt-4 text-base leading-relaxed text-slate-500">{section.pain}</p>
            </div>
            <div className="h-full rounded-2xl border border-brand-200 bg-brand-50 p-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-brand-600">
                The outcome
              </p>
              <p className="mt-4 text-base leading-relaxed text-brand-950">{section.outcome}</p>
            </div>
          </MobileSnapRail>

          <div className="hidden gap-5 lg:grid lg:grid-cols-2">
            <div className="rounded-[2rem] border border-line bg-white shadow-soft p-7 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                The situation
              </p>
              <p className="mt-5 text-lg leading-relaxed text-slate-500">{section.pain}</p>
            </div>
            <div className="rounded-[2rem] border border-brand-200 bg-brand-50 p-7 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-600">
                The outcome
              </p>
              <p className="mt-5 text-lg leading-relaxed text-brand-950">{section.outcome}</p>
            </div>
          </div>

          <ul className="mt-5 grid grid-cols-1 gap-2.5 sm:mt-6 sm:grid-cols-2 sm:gap-3">
            {section.bullets.map((b) => (
              <li
                key={b}
                className="flex gap-3 rounded-xl border border-line bg-white px-4 py-3.5 text-sm text-slate-500 sm:rounded-2xl sm:px-5 sm:py-4"
              >
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden />
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
      <SectionReveal className="bg-white py-12 lg:py-24">
        <div className="mx-auto max-w-[900px] px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[2rem] bg-deep-blue p-6 text-white shadow-lift sm:p-12">
            <span aria-hidden className="font-display text-5xl leading-none text-brand-300 sm:text-7xl">
              “
            </span>
            <p className="-mt-4 font-display text-lg font-medium leading-snug tracking-[-0.02em] text-white sm:-mt-6 sm:text-3xl">
              {section.text}
            </p>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-brand-200 sm:mt-8 sm:text-sm">
              {section.attribution}
            </p>
          </div>
        </div>
      </SectionReveal>
    );
  }

  return null;
}

function Hero({ page }: { page: MarketingPageConfig }) {
  const Icon = page.icon;
  const image =
    CATALOG_CARD_IMAGES[page.slug] ??
    DETAIL_HERO_BY_CATEGORY[page.category] ??
    DETAIL_HERO_BY_CATEGORY.product;
  const titleParts = page.title.split(" ");
  const accentWord = titleParts.length > 1 ? titleParts[titleParts.length - 1] : null;
  const titleLead =
    accentWord && titleParts.length > 1 ? titleParts.slice(0, -1).join(" ") : page.title;

  return (
    <section className="relative bg-white pb-8 lg:pb-12">
      <MarketingPageHeader className="pb-4" />

      <div className="px-2 sm:px-3">
        <div className="relative isolate mx-auto max-w-[1400px] overflow-hidden rounded-[2rem] bg-hero-blue lg:rounded-[2.75rem]">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-line-grid-light [mask-image:radial-gradient(ellipse_80%_70%_at_30%_40%,#000_25%,transparent_80%)]" />

          <div className="relative mx-auto grid max-w-[1200px] items-center gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:px-10 lg:py-24">
            <div>
              <Reveal>
                <CurrencyAwareEyebrow
                  slug={page.slug}
                  category={page.category}
                  fallback={page.eyebrow}
                  className="glass-blue inline-flex rounded-full px-3.5 py-1.5 text-xs font-semibold text-white"
                />
              </Reveal>
              <AnimatedHeadline
                as="h1"
                immediate
                delay={0.1}
                text={accentWord ? `${titleLead} *${accentWord}*` : page.title}
                highlightClassName="text-gradient-light"
                className="mt-6 max-w-xl font-display text-[2.4rem] font-semibold leading-[1.02] tracking-[-0.045em] text-white sm:text-6xl lg:text-[4.25rem]"
              />
              <Reveal delay={0.35}>
                <p className="mt-5 max-w-lg text-base font-medium leading-relaxed text-brand-50/90 sm:text-xl">{page.tagline}</p>
              </Reveal>
              <Reveal delay={0.45} className="mt-8">
                <Button href={page.primaryCta.href} variant="onBanner" className="min-h-12 px-7">
                  {page.primaryCta.label}
                </Button>
              </Reveal>
            </div>

            <Reveal delay={0.3} scale className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-white/40 shadow-lift lg:aspect-[5/4]">
                {image ? (
                  <>
                    <Image src={image.src} alt={image.alt} fill priority sizes="(min-width: 1024px) 520px, 100vw" className="object-cover" />
                    <div className="absolute inset-0 bg-brand-600/40 mix-blend-color" />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-950/60 via-transparent to-transparent" />
                  </>
                ) : null}
                <div className="glass-blue absolute bottom-4 left-4 flex items-center gap-3 rounded-2xl px-4 py-3 text-white">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-brand-600">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <span className="text-sm font-semibold">{page.title}</span>
                </div>
              </div>
            </Reveal>
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
        <div key={`${section.type}-${index}`} className="contents">
          <SectionBlock section={section} accent={page.accent} index={index} />
        </div>
      ))}
      {page.category === "pricing" ? <PricingPackagesSection highlightSlug={highlightPackage} /> : null}
    </>
  );
}
