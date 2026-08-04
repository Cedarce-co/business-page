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
import SectionReveal, { RevealItem, StaggerReveal } from "@/components/ui/SectionReveal";
import type { MarketingAccent, MarketingPageConfig, MarketingSection } from "@/lib/marketing-detail-pages";
import { CATALOG_CARD_IMAGES, DETAIL_HERO_BY_CATEGORY } from "@/lib/marketing-images";
import { cn } from "@/lib/utils";

const accentStyles: Record<MarketingAccent, { panel: string; dot: string }> = {
  teal: { panel: "bg-cedar-accentSoft border-cedar-accent/25", dot: "bg-cedar-accent" },
  purple: { panel: "bg-white/[0.04] border-white/15", dot: "bg-cedar-accent" },
  emerald: { panel: "bg-cedar-accentSoft border-cedar-accent/25", dot: "bg-cedar-accent" },
  amber: { panel: "bg-cedar-accentSoft border-cedar-accent/25", dot: "bg-cedar-accent" },
  cyan: { panel: "bg-white/[0.04] border-white/15", dot: "bg-cedar-accent" },
  rose: { panel: "bg-white/[0.04] border-white/15", dot: "bg-cedar-accent" },
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

function NetworkDecor() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.16]"
      viewBox="0 0 1200 700"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
    >
      <path
        d="M120 140 C 280 90, 420 220, 580 170 S 900 250, 1080 180"
        stroke="rgba(31,58,95,0.45)"
        strokeWidth="1"
        strokeDasharray="4 8"
      />
      <path
        d="M80 420 C 260 360, 420 520, 620 460 S 920 540, 1120 470"
        stroke="rgba(255,255,255,0.22)"
        strokeWidth="1"
        strokeDasharray="4 8"
      />
      <circle cx="580" cy="170" r="4" fill="rgba(31,58,95,0.55)" />
      <circle cx="620" cy="460" r="4" fill="rgba(255,255,255,0.3)" />
    </svg>
  );
}

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
            "flex items-center justify-center rounded-2xl border border-cedar-accent/15 bg-cedar-accentSoft",
            compact ? "mb-4 h-10 w-10" : "mb-6 h-12 w-12",
          )}
        >
          <Icon className={cn(compact ? "h-4 w-4" : "h-5 w-5", "text-cedar-accent")} aria-hidden />
        </div>
      ) : null}
      <h3 className={cn("font-bold text-cedar-ivory", compact ? "text-base" : "text-xl")}>{title}</h3>
      <p
        className={cn(
          "mt-2 flex-1 text-sm text-cedar-mist",
          compact ? "line-clamp-4 leading-6" : "mt-3 leading-7",
        )}
      >
        {body}
      </p>
      {href ? (
        <span
          className={cn(
            "inline-flex items-center gap-2 font-semibold text-cedar-accent",
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
    "group relative flex h-full flex-col overflow-hidden border border-white/[0.08] bg-[#121110]/90 transition duration-300",
    compact
      ? "min-h-[11.5rem] rounded-2xl p-5 active:scale-[0.98]"
      : "min-h-[180px] rounded-2xl p-6 hover:-translate-y-1 hover:border-cedar-accent/35 hover:bg-[#18150f]",
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
      <h2 className="font-display text-[1.85rem] leading-tight text-cedar-ivory sm:text-3xl lg:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 text-sm leading-relaxed text-cedar-mist sm:mt-4 sm:text-base lg:text-lg">
          {subtitle}
        </p>
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
  const altBg = index % 2 === 0 ? "bg-black" : "bg-zinc-950";

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
                className="rounded-xl border border-white/[0.08] bg-[#121110] px-2 py-3 text-center"
              >
                <p className="font-display text-xl text-cedar-ivory sm:text-2xl">{item.value}</p>
                <p className="mt-1 text-[10px] leading-snug text-cedar-mist sm:text-xs">{item.label}</p>
              </div>
            ))}
          </div>
          <StaggerReveal className="mt-12 hidden gap-4 sm:grid-cols-3 lg:grid">
            {section.items.map((item) => (
              <RevealItem key={item.label}>
                <div className="rounded-[1.75rem] border border-white/[0.08] bg-[#121110] p-7 text-left">
                  <p className="font-display text-4xl text-cedar-ivory lg:text-5xl">{item.value}</p>
                  <p className="mt-3 text-sm text-cedar-mist">{item.label}</p>
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
          <div className="rounded-2xl border border-white/[0.08] bg-[#121110] p-5 sm:rounded-[1.75rem] sm:p-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-cedar-accent sm:text-xs">
              {section.panelTitle}
            </p>
            <ul className="mt-4 space-y-3 sm:mt-6 sm:space-y-4">
              {section.panelItems.map((line) => (
                <li key={line} className="flex gap-3 text-sm leading-relaxed text-cedar-mist">
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
                className="flex h-full min-h-[11rem] flex-col rounded-2xl border border-white/[0.08] bg-[#121110] p-5"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-cedar-accent text-xs font-bold text-black">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-base font-bold text-cedar-ivory">{step.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-cedar-mist">{step.body}</p>
              </article>
            ))}
          />

          <div className="mt-12 hidden gap-4 lg:grid lg:grid-cols-3">
            {section.steps.map((step, i) => (
              <article
                key={step.title}
                className="rounded-[1.75rem] border border-white/[0.08] bg-[#121110] p-7"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-cedar-accent text-sm font-bold text-black">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 text-xl font-bold text-cedar-ivory">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-cedar-mist">{step.body}</p>
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
                className="flex gap-3 rounded-xl border border-white/[0.08] bg-[#121110] px-4 py-3.5 text-sm text-cedar-mist sm:rounded-2xl sm:px-5 sm:py-4"
              >
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-cedar-accent" aria-hidden />
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
            <div className="h-full rounded-2xl border border-white/[0.08] bg-[#121110] p-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/40">Before</p>
              <ul className="mt-4 space-y-3">
                {section.before.map((line) => (
                  <li key={line} className="text-sm leading-relaxed text-cedar-mist">
                    {line}
                  </li>
                ))}
              </ul>
            </div>
            <div className="h-full rounded-2xl border border-cedar-accent/25 bg-cedar-accentSoft p-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-cedar-accent">
                After Cedarce
              </p>
              <ul className="mt-4 space-y-3">
                {section.after.map((line) => (
                  <li key={line} className="flex gap-2 text-sm leading-relaxed text-cedar-ivory/90">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-cedar-accent" aria-hidden />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </MobileSnapRail>

          <div className="mt-12 hidden gap-5 lg:grid lg:grid-cols-2">
            <div className="rounded-[1.75rem] border border-white/[0.08] bg-[#121110] p-7 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/40">Before</p>
              <ul className="mt-6 space-y-4">
                {section.before.map((line) => (
                  <li key={line} className="text-sm leading-relaxed text-cedar-mist">
                    {line}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[1.75rem] border border-cedar-accent/25 bg-cedar-accentSoft p-7 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cedar-accent">
                After Cedarce
              </p>
              <ul className="mt-6 space-y-4">
                {section.after.map((line) => (
                  <li key={line} className="flex gap-3 text-sm leading-relaxed text-cedar-ivory/90">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-cedar-accent" aria-hidden />
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
            <div className="h-full rounded-2xl border border-white/[0.08] bg-[#121110] p-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/40">
                The situation
              </p>
              <p className="mt-4 text-base leading-relaxed text-cedar-mist">{section.pain}</p>
            </div>
            <div className="h-full rounded-2xl border border-cedar-accent/25 bg-cedar-accentSoft p-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-cedar-accent">
                The outcome
              </p>
              <p className="mt-4 text-base leading-relaxed text-cedar-ivory/90">{section.outcome}</p>
            </div>
          </MobileSnapRail>

          <div className="hidden gap-5 lg:grid lg:grid-cols-2">
            <div className="rounded-[1.75rem] border border-white/[0.08] bg-[#121110] p-7 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/40">
                The situation
              </p>
              <p className="mt-5 text-lg leading-relaxed text-cedar-mist">{section.pain}</p>
            </div>
            <div className="rounded-[1.75rem] border border-cedar-accent/25 bg-cedar-accentSoft p-7 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cedar-accent">
                The outcome
              </p>
              <p className="mt-5 text-lg leading-relaxed text-cedar-ivory/90">{section.outcome}</p>
            </div>
          </div>

          <ul className="mt-5 grid grid-cols-1 gap-2.5 sm:mt-6 sm:grid-cols-2 sm:gap-3">
            {section.bullets.map((b) => (
              <li
                key={b}
                className="flex gap-3 rounded-xl border border-white/[0.08] bg-[#121110] px-4 py-3.5 text-sm text-cedar-mist sm:rounded-2xl sm:px-5 sm:py-4"
              >
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-cedar-accent" aria-hidden />
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
      <SectionReveal className="bg-black py-12 lg:py-24">
        <div className="mx-auto max-w-[900px] px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-white/[0.08] bg-zinc-950 p-6 sm:rounded-[2rem] sm:p-12">
            <span aria-hidden className="font-display text-5xl leading-none text-cedar-accent/30 sm:text-7xl">
              “
            </span>
            <p className="-mt-4 text-lg leading-relaxed text-cedar-ivory sm:-mt-6 sm:text-2xl">
              {section.text}
            </p>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-cedar-accent sm:mt-8 sm:text-sm">
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
    <section className="relative overflow-hidden bg-black pb-10 lg:pb-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.28] [background-image:radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:22px_22px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 82% 18%, rgba(31,58,95,0.14), transparent 55%)",
        }}
      />
      <NetworkDecor />
      <MarketingPageHeader tone="dark" className="pb-2" />

      <div className="relative mx-auto grid max-w-[1200px] items-start gap-6 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8">
        {/* Mobile image band */}
        {image ? (
          <div className="relative h-40 overflow-hidden rounded-2xl border border-white/10 lg:hidden">
            <Image src={image.src} alt={image.alt} fill priority sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10" />
            <div className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-xl border border-cedar-accent/20 bg-cedar-accentSoft">
              <Icon className="h-5 w-5 text-cedar-accent" aria-hidden />
            </div>
          </div>
        ) : null}

        <div>
          <CurrencyAwareEyebrow
            slug={page.slug}
            category={page.category}
            fallback={page.eyebrow}
            className="text-[10px] font-semibold uppercase tracking-[0.32em] text-cedar-accent sm:text-xs"
          />
          <h1 className="mt-4 max-w-xl font-display text-[1.85rem] leading-[1.05] tracking-tight text-cedar-ivory sm:mt-7 sm:text-5xl lg:text-[3.75rem]">
            {accentWord ? (
              <>
                {titleLead} <span className="text-cedar-accent">{accentWord}</span>
              </>
            ) : (
              page.title
            )}
          </h1>
          <p className="mt-3 max-w-lg text-base font-semibold text-cedar-ivory/90 sm:mt-5 sm:text-xl">
            {page.tagline}
          </p>
          <div className="mt-6 flex justify-center sm:mt-9 sm:justify-start">
            <Button href={page.primaryCta.href} variant="accent" className="min-h-12 w-1/2 px-3 text-xs sm:w-auto sm:px-7 sm:text-base">
              {page.primaryCta.label}
            </Button>
          </div>
        </div>

        <div className="relative hidden min-h-[22rem] lg:block">
          <div className="absolute inset-0 overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#121110]/80 p-8 backdrop-blur-sm">
            {image ? (
              <>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 1024px) 520px, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/78 to-black/30" />
                <div className="absolute inset-0 bg-cedar-accent/10 mix-blend-color" />
              </>
            ) : null}
            <div className="absolute bottom-6 left-6 flex h-12 w-12 items-center justify-center rounded-xl border border-cedar-accent/20 bg-black/50 backdrop-blur-md">
              <Icon className="h-7 w-7 text-cedar-accent" aria-hidden />
            </div>
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
