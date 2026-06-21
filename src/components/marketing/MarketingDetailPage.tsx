import type { ComponentType } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, CreditCard, Globe, GraduationCap, Layers, Mail, MessageSquare, Receipt, Share2, Shield, Smartphone, Users, Zap } from "lucide-react";
import PricingPackagesSection from "@/components/marketing/PricingPackagesSection";
import Button from "@/components/ui/Button";
import type { MarketingAccent, MarketingPageConfig, MarketingSection } from "@/lib/marketing-detail-pages";
import { marketingPagePath } from "@/lib/marketing-detail-pages";

const accentStyles: Record<
  MarketingAccent,
  { heroBg: string; badge: string; panel: string; dot: string; ring: string }
> = {
  teal: {
    heroBg: "from-teal-950 via-cliq-navy-900 to-cliq-navy-900",
    badge: "bg-teal-500/20 text-teal-300",
    panel: "bg-teal-500/10 border-teal-500/20",
    dot: "bg-teal-500",
    ring: "ring-teal-500/30",
  },
  purple: {
    heroBg: "from-violet-950 via-cliq-navy-900 to-cliq-navy-900",
    badge: "bg-violet-500/20 text-violet-300",
    panel: "bg-violet-500/10 border-violet-500/20",
    dot: "bg-violet-500",
    ring: "ring-violet-500/30",
  },
  emerald: {
    heroBg: "from-emerald-950 via-cliq-navy-900 to-cliq-navy-900",
    badge: "bg-emerald-500/20 text-emerald-300",
    panel: "bg-emerald-500/10 border-emerald-500/20",
    dot: "bg-emerald-500",
    ring: "ring-emerald-500/30",
  },
  amber: {
    heroBg: "from-amber-950 via-cliq-navy-900 to-cliq-navy-900",
    badge: "bg-amber-500/20 text-amber-300",
    panel: "bg-amber-500/10 border-amber-500/20",
    dot: "bg-amber-500",
    ring: "ring-amber-500/30",
  },
  cyan: {
    heroBg: "from-cyan-950 via-cliq-navy-900 to-cliq-navy-900",
    badge: "bg-cyan-500/20 text-cyan-300",
    panel: "bg-cyan-500/10 border-cyan-500/20",
    dot: "bg-cyan-500",
    ring: "ring-cyan-500/30",
  },
  rose: {
    heroBg: "from-rose-950 via-cliq-navy-900 to-cliq-navy-900",
    badge: "bg-rose-500/20 text-rose-300",
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
  const altBg = index % 2 === 1 ? "bg-cliq-gray-50" : "bg-white";

  const sectionTitleClass = "text-center text-2xl font-black text-cliq-text-heading lg:text-3xl";
  const sectionSubtitleClass = "mx-auto mt-3 max-w-2xl text-center text-cliq-text-body";

  if (section.type === "stats") {
    return (
      <section className={`${altBg} py-16 lg:py-20`}>
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <h2 className={sectionTitleClass}>{section.title}</h2>
          <div className="mt-10 grid gap-6 text-left sm:grid-cols-3">
            {section.items.map((item) => (
              <div key={item.label} className={`rounded-2xl border bg-white p-6 shadow-card ${a.ring} ring-1`}>
                <p className="text-4xl font-black text-cliq-navy-900">{item.value}</p>
                <p className="mt-2 text-sm text-cliq-text-body">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (section.type === "bento") {
    return (
      <section className={`${altBg} py-16 lg:py-20`}>
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <h2 className={sectionTitleClass}>{section.title}</h2>
          {section.subtitle ? <p className={sectionSubtitleClass}>{section.subtitle}</p> : null}
          <div className="mt-10 grid gap-4 text-left sm:grid-cols-2">
            {section.items.map((item) => {
              const Icon = bentoIcons[item.icon] ?? Layers;
              return (
                <article key={item.title} className="rounded-2xl border border-cliq-gray-200 bg-white p-6 shadow-card">
                  <Icon className="h-6 w-6 text-cliq-navy-800" aria-hidden />
                  <h3 className="mt-4 text-lg font-bold text-cliq-text-heading">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-cliq-text-body">{item.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  if (section.type === "split") {
    return (
      <section className={`${altBg} py-16 lg:py-20`}>
        <div className="mx-auto max-w-[1200px] px-4 text-center sm:px-6 lg:px-8">
          <h2 className={sectionTitleClass}>{section.title}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center leading-relaxed text-cliq-text-body">{section.body}</p>
          <div className={`mx-auto mt-10 max-w-xl rounded-2xl border p-6 text-left lg:p-8 ${a.panel}`}>
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
      </section>
    );
  }

  if (section.type === "timeline") {
    return (
      <section className={`${altBg} py-16 lg:py-20`}>
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <h2 className={sectionTitleClass}>{section.title}</h2>
          <ol
            className={
              section.orientation === "horizontal"
                ? "mt-10 grid gap-8 text-left lg:grid-cols-3"
                : "relative mt-10 space-y-8 border-l-2 border-cliq-gray-200 pl-8 text-left"
            }
          >
            {section.steps.map((step, i) => (
              <li key={step.title} className={section.orientation === "vertical" ? "relative" : ""}>
                {section.orientation === "vertical" ? (
                  <span className={`absolute -left-[2.125rem] top-1 flex h-4 w-4 rounded-full ring-4 ring-white ${a.dot}`} aria-hidden />
                ) : null}
                <span className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-xs font-black text-white ${a.dot}`}>
                  {i + 1}
                </span>
                <h3 className="mt-3 font-bold text-cliq-text-heading">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cliq-text-body">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  }

  if (section.type === "checklist") {
    return (
      <section className={`${altBg} py-16 lg:py-20`}>
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <h2 className={sectionTitleClass}>{section.title}</h2>
          <ul className={`mt-8 grid gap-3 text-left ${section.columns === 2 ? "sm:grid-cols-2" : ""}`}>
            {section.items.map((item) => (
              <li key={item} className="flex gap-3 rounded-xl border border-cliq-gray-200 bg-white p-4 text-sm text-cliq-text-body">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  if (section.type === "comparison") {
    return (
      <section className={`${altBg} py-16 lg:py-20`}>
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <h2 className={sectionTitleClass}>{section.title}</h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-rose-200 bg-rose-50/80 p-6">
              <p className="text-xs font-bold uppercase tracking-wide text-rose-800">Before</p>
              <ul className="mt-4 space-y-2">
                {section.before.map((line) => (
                  <li key={line} className="text-sm text-cliq-text-body">• {line}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/80 p-6">
              <p className="text-xs font-bold uppercase tracking-wide text-emerald-800">After Cedarce</p>
              <ul className="mt-4 space-y-2">
                {section.after.map((line) => (
                  <li key={line} className="text-sm text-cliq-text-body">• {line}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (section.type === "pain-outcome") {
    return (
      <section className={`${altBg} py-16 lg:py-20`}>
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-rose-200 bg-gradient-to-br from-rose-50 to-white p-8">
              <p className="text-xs font-bold uppercase tracking-wide text-rose-700">The situation</p>
              <p className="mt-4 text-lg leading-relaxed text-cliq-text-body">{section.pain}</p>
            </div>
            <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-8">
              <p className="text-xs font-bold uppercase tracking-wide text-emerald-800">The outcome</p>
              <p className="mt-4 text-lg leading-relaxed text-cliq-text-body">{section.outcome}</p>
            </div>
          </div>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {section.bullets.map((b) => (
              <li key={b} className={`flex gap-3 rounded-xl border p-4 text-sm ${a.panel}`}>
                <Check className="h-4 w-4 shrink-0 text-emerald-600" aria-hidden />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  if (section.type === "quote") {
    return (
      <section className="bg-cliq-navy-900 py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-xl font-medium leading-relaxed text-white/90 lg:text-2xl">&ldquo;{section.text}&rdquo;</p>
          <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-cliq-teal">{section.attribution}</p>
        </div>
      </section>
    );
  }

  return null;
}

function Hero({ page }: { page: MarketingPageConfig }) {
  const a = accentStyles[page.accent];
  const Icon = page.icon;
  const backHref =
    page.category === "product" ? "/about" : page.category === "solution" ? "/services" : "/pricing";
  const backLabel =
    page.category === "product" ? "Product" : page.category === "solution" ? "Solutions" : "Pricing";

  if (page.heroVariant === "split") {
    return (
      <section className="border-b border-cliq-gray-200 bg-[linear-gradient(165deg,#f8fafc_0%,#ffffff_50%)]">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center px-4 py-12 text-center sm:px-6 lg:px-8 lg:py-20">
          <Link href={backHref} className="self-start inline-flex items-center gap-1 text-sm font-semibold text-cliq-text-muted hover:text-cliq-navy-900">
            <ArrowLeft className="h-4 w-4" aria-hidden />
            {backLabel}
          </Link>
          <p className={`mt-6 inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${a.badge}`}>
            {page.eyebrow}
          </p>
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
          <div className={`mx-auto mt-10 max-w-md rounded-3xl bg-gradient-to-br p-8 text-left text-white ${a.heroBg}`}>
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
      <section className="border-b border-cliq-gray-200 bg-white py-16 lg:py-24">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center px-4 text-center sm:px-6 lg:px-8">
          <Link href={backHref} className="self-start inline-flex items-center gap-1 text-sm font-semibold text-cliq-text-muted hover:text-cliq-navy-900">
            <ArrowLeft className="h-4 w-4" aria-hidden />
            {backLabel}
          </Link>
          <div className="mt-8 flex w-full max-w-3xl flex-col items-center">
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
    <section className={`relative overflow-hidden bg-gradient-to-b pb-20 pt-12 ${a.heroBg}`}>
      <div className="relative mx-auto flex max-w-[1200px] flex-col items-center px-4 text-center sm:px-6 lg:px-8">
        <Link href={backHref} className="self-start inline-flex items-center gap-1 text-sm font-semibold text-white/70 hover:text-white">
          <ArrowLeft className="h-4 w-4" aria-hidden />
          {backLabel}
        </Link>
        <div className="mt-8 flex w-full max-w-3xl flex-col items-center">
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
      <section className="border-t border-cliq-gray-200 bg-cliq-gray-100 py-16">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-xl font-black text-cliq-text-heading">
            Related{" "}
            {page.category === "product" ? "products" : page.category === "solution" ? "solutions" : "pricing options"}
          </h2>
          <div className="mt-6 grid gap-4 text-left sm:grid-cols-3">
            {page.related.map((r) => (
              <Link
                key={r.slug}
                href={marketingPagePath(r.category, r.slug)}
                className="group flex items-center justify-between rounded-2xl border border-cliq-gray-200 bg-white p-5 shadow-card transition hover:border-cliq-navy-800/20"
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
      </section>
    </>
  );
}
