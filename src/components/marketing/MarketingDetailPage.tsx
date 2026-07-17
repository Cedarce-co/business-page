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
import Button from "@/components/ui/Button";
import MarketingPageHeader from "@/components/navigation/MarketingPageHeader";
import SectionReveal, { RevealItem, StaggerReveal } from "@/components/ui/SectionReveal";
import type { MarketingAccent, MarketingPageConfig, MarketingSection } from "@/lib/marketing-detail-pages";
import { getMarketingCatalogEntries, marketingPagePath } from "@/lib/marketing-detail-pages";
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
}: {
  href?: string;
  title: string;
  body: string;
  icon?: ComponentType<{ className?: string }>;
}) {
  const content = (
    <>
      {Icon ? (
        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-cedar-accent/15 bg-cedar-accentSoft">
          <Icon className="h-5 w-5 text-cedar-accent" aria-hidden />
        </div>
      ) : null}
      <h3 className="text-xl font-bold text-cedar-ivory">{title}</h3>
      <p className="mt-3 flex-1 text-sm leading-7 text-cedar-mist">{body}</p>
      {href ? (
        <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-cedar-accent">
          Learn more
          <ArrowRight className="h-4 w-4 transition duration-200 group-hover:translate-x-1" aria-hidden />
        </span>
      ) : null}
    </>
  );

  const className =
    "group relative flex min-h-[220px] flex-col overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-[#121110]/90 p-7 transition duration-300 hover:-translate-y-1 hover:border-cedar-accent/35 hover:bg-[#18150f] sm:p-8";

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
      <h2 className="font-display text-3xl leading-tight text-cedar-ivory lg:text-4xl">{title}</h2>
      {subtitle ? <p className="mt-4 text-base leading-relaxed text-cedar-mist lg:text-lg">{subtitle}</p> : null}
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
      <SectionReveal className={`${altBg} py-16 lg:py-24`}>
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <SectionIntro title={section.title} />
          <StaggerReveal className="mt-12 grid gap-4 sm:grid-cols-3">
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
      <SectionReveal preserveSticky className={`${altBg} py-16 lg:py-24`}>
        <div className="relative mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-16">
            <div className="lg:sticky lg:top-[calc(var(--site-nav-height)+2rem)]">
              <SectionIntro title={section.title} subtitle={section.subtitle} />
            </div>
            <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
              <div className="flex flex-col gap-5 sm:gap-6 lg:pt-16">
                {left.map((item) => (
                  <ElegantCard
                    key={item.title}
                    title={item.title}
                    body={item.body}
                    icon={bentoIcons[item.icon] ?? Layers}
                  />
                ))}
              </div>
              <div className="flex flex-col gap-5 sm:gap-6">
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
      </SectionReveal>
    );
  }

  if (section.type === "split") {
    return (
      <SectionReveal preserveSticky className={`${altBg} py-16 lg:py-24`}>
        <div className="mx-auto grid max-w-[1200px] items-start gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <div className="lg:sticky lg:top-[calc(var(--site-nav-height)+2rem)]">
            <SectionIntro title={section.title} subtitle={section.body} />
          </div>
          <div className="rounded-[1.75rem] border border-white/[0.08] bg-[#121110] p-7 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cedar-accent">
              {section.panelTitle}
            </p>
            <ul className="mt-6 space-y-4">
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
      <SectionReveal className={`${altBg} py-16 lg:py-24`}>
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <SectionIntro title={section.title} />
          <div className="mt-12 grid gap-4 lg:grid-cols-3">
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
      <SectionReveal className={`${altBg} py-16 lg:py-24`}>
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <SectionIntro title={section.title} />
          <ul
            className={cn(
              "mt-10 grid gap-3",
              section.columns === 2 ? "sm:grid-cols-2" : "max-w-2xl"
            )}
          >
            {section.items.map((item) => (
              <li
                key={item}
                className="flex gap-3 rounded-2xl border border-white/[0.08] bg-[#121110] px-5 py-4 text-sm text-cedar-mist"
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
      <SectionReveal className={`${altBg} py-16 lg:py-24`}>
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <SectionIntro title={section.title} />
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
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
      <SectionReveal className={`${altBg} py-16 lg:py-24`}>
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 lg:grid-cols-2">
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
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {section.bullets.map((b) => (
              <li
                key={b}
                className="flex gap-3 rounded-2xl border border-white/[0.08] bg-[#121110] px-5 py-4 text-sm text-cedar-mist"
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
      <SectionReveal className="bg-black py-16 lg:py-24">
        <div className="mx-auto max-w-[900px] px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-white/[0.08] bg-zinc-950 p-8 sm:p-12">
            <span aria-hidden className="font-display text-7xl leading-none text-cedar-accent/30">
              “
            </span>
            <p className="-mt-6 text-xl leading-relaxed text-cedar-ivory sm:text-2xl">
              {section.text}
            </p>
            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-cedar-accent">
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
    <section className="relative overflow-hidden bg-black pb-16 lg:pb-24">
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

      <div className="relative mx-auto grid max-w-[1200px] items-start gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cedar-accent">
            {page.eyebrow}
          </p>
          <h1 className="mt-7 max-w-xl font-display text-4xl leading-[1.05] tracking-tight text-cedar-ivory sm:text-5xl lg:text-[3.75rem]">
            {accentWord ? (
              <>
                {titleLead} <span className="text-cedar-accent">{accentWord}</span>
              </>
            ) : (
              page.title
            )}
          </h1>
          <p className="mt-5 max-w-lg text-xl font-semibold text-cedar-ivory/90">{page.tagline}</p>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-cedar-mist lg:text-lg">
            {page.lead}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Button href={page.primaryCta.href} variant="accent" className="min-h-12 px-7">
              {page.primaryCta.label}
            </Button>
            <Button href={page.secondaryCta.href} variant="ghost" className="min-h-12 px-0">
              {page.secondaryCta.label}
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
            <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-cedar-accent/20 bg-cedar-accentSoft">
              <Icon className="h-7 w-7 text-cedar-accent" aria-hidden />
            </div>
            <p className="relative mt-10 text-xs font-semibold uppercase tracking-[0.28em] text-cedar-accent">
              What you get
            </p>
            <p className="relative mt-4 text-2xl font-bold leading-snug text-cedar-ivory">{page.title}</p>
            <p className="relative mt-4 text-sm leading-7 text-cedar-mist">{page.tagline}</p>
            <div className="relative mt-8 flex flex-wrap gap-2">
              {(page.category === "product" ? "Product" : page.category === "solution" ? "Solution" : "Pricing")
                .split(" ")
                .map((label) => (
                  <span
                    key={label}
                    className="rounded-full border border-white/15 px-3 py-1 text-xs font-medium text-cedar-mist"
                  >
                    {label}
                  </span>
                ))}
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

  const relatedCatalog =
    page.category === "product" || page.category === "solution"
      ? getMarketingCatalogEntries(page.category).filter((entry) => entry.id !== page.slug).slice(0, 4)
      : [];

  const relatedCards =
    relatedCatalog.length > 0
      ? relatedCatalog
      : page.related.map((r) => ({
          id: r.slug,
          title: r.label,
          description: `Explore ${r.label}`,
          href: marketingPagePath(r.category, r.slug),
          icon: Layers,
        }));

  return (
    <>
      <Hero page={page} />
      {page.sections.map((section, index) => (
        <SectionBlock key={`${section.type}-${index}`} section={section} accent={page.accent} index={index} />
      ))}
      {page.category === "pricing" ? <PricingPackagesSection highlightSlug={highlightPackage} /> : null}

      <SectionReveal preserveSticky className="border-t border-white/10 bg-zinc-950 py-16 lg:py-24">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,360px)_1fr] lg:gap-16">
            <div className="lg:sticky lg:top-[calc(var(--site-nav-height)+2rem)]">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cedar-accent">
                Explore more
              </p>
              <h2 className="mt-4 font-display text-3xl text-cedar-ivory lg:text-4xl">
                Related{" "}
                <span className="text-cedar-accent">
                  {page.category === "product"
                    ? "products"
                    : page.category === "solution"
                      ? "solutions"
                      : "options"}
                </span>
              </h2>
              <p className="mt-4 text-cedar-mist">
                Browse more from the same list you opened in the menu.
              </p>
              {page.category !== "pricing" ? (
                <Link
                  href={page.category === "product" ? "/product" : "/solutions"}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cedar-accent"
                >
                  View all {page.category === "product" ? "products" : "solutions"}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              ) : (
                <Link href="/faq" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cedar-accent">
                  Pricing FAQ
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              )}
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {relatedCards.map((card, index) => (
                <div key={card.id} className={index % 2 === 1 ? "sm:mt-10" : undefined}>
                  <ElegantCard
                    href={card.href}
                    title={card.title}
                    body={card.description}
                    icon={card.icon}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionReveal>
    </>
  );
}
