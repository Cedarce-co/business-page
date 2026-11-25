import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { SERVICES } from "@/lib/constants";
import { getServicePageDetail } from "@/lib/service-pages";
import FinalCTASection from "@/components/home/FinalCTASection";
import Button from "@/components/ui/Button";
import PageHero from "@/components/marketing/PageHero";
import AnimatedHeadline from "@/components/motion/AnimatedHeadline";
import Reveal, { RevealGroup, RevealGroupItem } from "@/components/motion/Reveal";

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
      <PageHero
        badge="Service"
        title={service.name}
        description={
          <>
            <span className="block text-lg font-semibold text-white sm:text-xl">{detail.tagline}</span>
            <span className="mt-3 block">{detail.lead}</span>
          </>
        }
      >
        <Button href={detail.primaryCta.href} variant="onBanner" className="min-h-12 px-7">
          {detail.primaryCta.label}
        </Button>
        <Button href={detail.secondaryCta.href} variant="onDark" className="min-h-12 px-7" noArrow>
          {detail.secondaryCta.label}
        </Button>
      </PageHero>

      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <span className="btn-sheen flex h-12 w-12 items-center justify-center rounded-2xl bg-g-button text-white shadow-glow-sm">
              <HeroIcon className="h-6 w-6" aria-hidden />
            </span>
            <AnimatedHeadline
              text="What you *gain*"
              className="font-display text-3xl font-semibold tracking-[-0.04em] text-brand-950 sm:text-5xl"
            />
          </div>
          <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {detail.outcomes.map((line) => (
              <RevealGroupItem key={line}>
                <div className="flex h-full gap-3 rounded-[1.75rem] border border-line bg-white p-6 text-[15px] leading-relaxed text-slate-600 shadow-soft">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />
                  </span>
                  <span>{line}</span>
                </div>
              </RevealGroupItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="bg-gradient-to-b from-brand-50/70 to-white py-16 lg:py-24">
        <RevealGroup className="mx-auto grid max-w-[1200px] gap-4 px-4 sm:px-6 lg:grid-cols-3 lg:gap-5 lg:px-8">
          <RevealGroupItem>
            <article className="h-full rounded-[2rem] border border-line bg-white p-7 shadow-soft">
              <h2 className="text-xl font-semibold tracking-tight text-brand-950">What&apos;s included</h2>
              <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-slate-600">
                {detail.included.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </RevealGroupItem>
          <RevealGroupItem>
            <article className="relative h-full overflow-hidden rounded-[2rem] bg-deep-blue p-7 text-white shadow-lift">
              <h2 className="text-xl font-semibold tracking-tight">Who it&apos;s for</h2>
              <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-brand-100/90">
                {detail.forYou.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-300" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </RevealGroupItem>
          <RevealGroupItem>
            <article className="h-full rounded-[2rem] border border-line bg-white p-7 shadow-soft">
              <h2 className="text-xl font-semibold tracking-tight text-brand-950">How we work with you</h2>
              <ol className="mt-5 space-y-5">
                {detail.steps.map((step, i) => (
                  <li key={step.title} className="flex gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-xs font-semibold text-brand-700">
                      {i + 1}
                    </span>
                    <span>
                      <span className="block font-semibold text-brand-950">{step.title}</span>
                      <span className="mt-1 block text-sm leading-relaxed text-slate-500">{step.body}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </article>
          </RevealGroupItem>
        </RevealGroup>
      </section>

      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <AnimatedHeadline
                text="Related *capabilities*"
                className="font-display text-3xl font-semibold tracking-[-0.04em] text-brand-950 sm:text-4xl"
              />
              <Reveal delay={0.1}>
                <p className="mt-2 max-w-2xl text-[15px] text-slate-500">
                  Most clients combine services. Explore adjacent pillars or compare packages on pricing.
                </p>
              </Reveal>
            </div>
            <Link href="/pricing" className="text-sm font-semibold text-brand-600 underline-offset-4 hover:underline">
              Compare packages →
            </Link>
          </div>
          <RevealGroup className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <RevealGroupItem key={item.id}>
                <Link
                  href={`/services/${item.id}`}
                  className="group flex h-full flex-col rounded-[1.75rem] border border-line bg-white p-6 shadow-soft transition duration-500 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift"
                >
                  <span className="text-lg font-semibold tracking-tight text-brand-950">{item.name}</span>
                  <span className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">{item.desc}</span>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-600">
                    View details
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </Link>
              </RevealGroupItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <FinalCTASection />
    </>
  );
}
