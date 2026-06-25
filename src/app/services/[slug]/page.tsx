import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { SERVICES } from "@/lib/constants";
import { getServicePageDetail } from "@/lib/service-pages";
import FinalCTASection from "@/components/home/FinalCTASection";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import MarketingPageHeader from "@/components/navigation/MarketingPageHeader";
import SectionReveal, { RevealItem, StaggerReveal } from "@/components/ui/SectionReveal";
import { ruledCell, ruledGridCols, ruledGridColsLg } from "@/lib/ruled-layout";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.id }));
}

export default async function ServiceDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = SERVICES.find((item) => item.id === slug);
  const detail = getServicePageDetail(slug);
  if (!service || !detail) notFound();

  const HeroIcon = detail.heroIcon;
  const related = detail.relatedSlugs
    .map((id) => SERVICES.find((s) => s.id === id))
    .filter(Boolean) as typeof SERVICES;

  return (
    <>
      <section className="relative overflow-hidden bg-cliq-navy-900 pb-20">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-mesh-dark opacity-90" />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-dot-grid opacity-[0.08]" />
        <MarketingPageHeader tone="dark" />
        <div className="relative mx-auto flex max-w-[1200px] flex-col items-center px-4 text-center sm:px-6 lg:px-8">
          <Badge className="uppercase tracking-wide">Service</Badge>
          <span className="mt-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/10 backdrop-blur-sm">
            <HeroIcon className="h-8 w-8 text-white/90" aria-hidden />
          </span>
          <h1 className="mt-6 max-w-4xl text-4xl font-black tracking-tight text-white lg:text-5xl">{service.name}</h1>
          <p className="mt-2 max-w-3xl text-balance text-center text-xl font-semibold text-white/90">{detail.tagline}</p>
          <p className="mt-4 max-w-4xl text-balance text-center text-base leading-relaxed text-white/75">{detail.lead}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href={detail.primaryCta.href} variant="onBanner" className="rounded-xl px-6 py-3 text-sm font-bold">
              {detail.primaryCta.label}
            </Button>
            <Button href={detail.secondaryCta.href} variant="onDark" className="rounded-xl px-6 py-3 text-sm font-bold">
              {detail.secondaryCta.label}
            </Button>
          </div>
        </div>
      </section>

      <SectionReveal className="border-b border-cliq-gray-200 bg-cliq-gray-50 py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-black text-cliq-text-heading lg:text-3xl">What you gain</h2>
          <StaggerReveal className={cn("mt-8", ruledGridCols(3))}>
            {detail.outcomes.map((line) => (
              <RevealItem key={line}>
                <div className={cn("flex h-full gap-3 text-cliq-text-body", ruledCell)}>
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden />
                  <span>{line}</span>
                </div>
              </RevealItem>
            ))}
          </StaggerReveal>
        </div>
      </SectionReveal>

      <SectionReveal className="bg-white py-16 lg:py-20">
        <div className={cn("mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8", ruledGridColsLg(3))}>
          <article className={ruledCell}>
            <h2 className="text-xl font-bold text-cliq-text-heading">What&apos;s included</h2>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-cliq-text-body">
              {detail.included.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cliq-navy-800" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </article>
          <article className={cn(ruledCell, "bg-cliq-gray-50")}>
            <h2 className="text-xl font-bold text-cliq-text-heading">Who it&apos;s for</h2>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-cliq-text-body">
              {detail.forYou.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-600" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </article>
          <article className={ruledCell}>
            <h2 className="text-xl font-bold text-cliq-text-heading">How we work with you</h2>
            <ol className="mt-5 space-y-5">
              {detail.steps.map((step) => (
                <li key={step.title}>
                  <p className="font-semibold text-cliq-text-heading">{step.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-cliq-text-body">{step.body}</p>
                </li>
              ))}
            </ol>
          </article>
        </div>
      </SectionReveal>

      <section className="relative overflow-hidden border-t border-cliq-gray-200 bg-cliq-navy-900 py-16 text-white">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-mesh-dark opacity-80" />
        <div className="relative mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-cliq-teal">Next step</p>
            <h2 className="mt-3 text-3xl font-black lg:text-4xl">Turn this into a concrete plan for your business</h2>
            <p className="mt-4 text-white/75">
              Tell us your goals. We&apos;ll map the fastest path to leads and revenue together.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/contact" variant="onBanner" className="rounded-xl px-8 py-3 text-sm font-bold">
              Book a consultation
            </Button>
            <Button href="/signup" variant="onDark" className="rounded-xl px-8 py-3 text-sm font-bold">
              Start with a free account
            </Button>
          </div>
        </div>
      </section>

      <SectionReveal className="bg-cliq-gray-50 py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-4 text-center sm:px-6 lg:px-8">
          <h3 className="text-2xl font-black text-cliq-text-heading">Related capabilities</h3>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-cliq-text-muted">
            Most clients combine services. Explore adjacent pillars or compare packages on pricing.
          </p>
          <StaggerReveal className={cn("mt-8 text-left", ruledGridCols(3))}>
            {related.map((item) => (
              <RevealItem key={item.id}>
                <Link
                  href={`/services/${item.id}`}
                  className={cn("group flex h-full flex-col transition hover:bg-white", ruledCell)}
                >
                  <span className="font-semibold text-cliq-text-heading group-hover:text-cliq-navy-900">{item.name}</span>
                  <span className="mt-2 flex-1 text-sm text-cliq-text-muted">{item.desc}</span>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-cliq-navy-800">
                    View details
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </RevealItem>
            ))}
          </StaggerReveal>
          <div className="mt-10 text-center">
            <Link href="/pricing" className="text-sm font-semibold text-cliq-navy-800 underline-offset-4 hover:underline">
              Compare Starter, Business &amp; Enterprise packages →
            </Link>
          </div>
        </div>
      </SectionReveal>

      <FinalCTASection />
    </>
  );
}
