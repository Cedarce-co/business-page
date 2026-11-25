"use client";

import Link from "next/link";
import { ArrowUpRight, type LucideIcon } from "lucide-react";
import Button from "@/components/ui/Button";
import PageHero from "@/components/marketing/PageHero";
import AnimatedHeadline from "@/components/motion/AnimatedHeadline";
import Reveal, { RevealGroup, RevealGroupItem } from "@/components/motion/Reveal";
import type { MarketingImage } from "@/lib/marketing-images";

export type CatalogCardItem = {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  badge?: string | null;
};

function CatalogCard({ card, index }: { card: CatalogCardItem; index: number }) {
  const Icon = card.icon;

  return (
    <Link
      href={card.href}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
      className="group relative isolate flex h-full min-h-[15rem] flex-col overflow-hidden rounded-[2rem] border border-line bg-white p-6 shadow-soft transition duration-500 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift sm:p-7"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition duration-500 group-hover:opacity-100"
        style={{ background: "radial-gradient(300px circle at var(--mx) var(--my), rgba(52,122,213,0.10), transparent 65%)" }}
      />
      <div className="flex items-start justify-between">
        <span className="btn-sheen flex h-12 w-12 items-center justify-center rounded-2xl bg-g-button text-white shadow-glow-sm transition duration-500 group-hover:-rotate-6 group-hover:scale-105">
          <Icon className="h-5 w-5" aria-hidden />
        </span>
        <span className="font-display text-sm font-semibold text-brand-200">{String(index + 1).padStart(2, "0")}</span>
      </div>
      {card.badge ? (
        <span className="mt-6 inline-flex w-fit rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-semibold text-brand-700">
          {card.badge}
        </span>
      ) : null}
      <h3 className={`${card.badge ? "mt-3" : "mt-6"} text-xl font-semibold leading-snug tracking-tight text-brand-950`}>
        {card.title}
      </h3>
      <p className="mt-2 line-clamp-3 flex-1 text-[15px] leading-relaxed text-slate-500">{card.description}</p>
      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
        Learn more
        <ArrowUpRight className="h-4 w-4 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
      </span>
    </Link>
  );
}

type MarketingCatalogLayoutProps = {
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  cards: CatalogCardItem[];
  ctaTitle: string;
  ctaText: string;
  panelImage: MarketingImage;
};

/** Blue hero panel, then a simple animated card grid, then a CTA band. */
export default function MarketingCatalogLayout({
  eyebrow,
  title,
  description,
  cards,
  ctaTitle,
  ctaText,
  panelImage,
}: MarketingCatalogLayoutProps) {
  return (
    <>
      <PageHero badge={eyebrow} title={title} description={description} image={panelImage} />

      <section className="bg-white pb-16 pt-8 lg:pb-24 lg:pt-12">
        <RevealGroup className="mx-auto grid max-w-[1200px] gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:gap-5 lg:px-8" stagger={0.07}>
          {cards.map((card, i) => (
            <RevealGroupItem key={card.id}>
              <CatalogCard card={card} index={i} />
            </RevealGroupItem>
          ))}
        </RevealGroup>
      </section>

      <section className="bg-white pb-20 lg:pb-28">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="relative isolate overflow-hidden rounded-[2.25rem] border border-line bg-g-card px-6 py-10 sm:px-12 lg:flex lg:items-center lg:justify-between lg:gap-10 lg:py-14">
            <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-dot-grid opacity-50 [mask-image:radial-gradient(ellipse_at_right,#000,transparent_70%)]" />
            <div>
              <Reveal>
                <p className="text-sm font-semibold text-brand-600">Ready when you are</p>
              </Reveal>
              <AnimatedHeadline
                text={ctaTitle}
                className="mt-2 font-display text-3xl font-semibold tracking-[-0.035em] text-brand-950 sm:text-4xl"
              />
              <Reveal delay={0.1}>
                <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-slate-500 sm:text-base">{ctaText}</p>
              </Reveal>
            </div>
            <Reveal delay={0.2} className="mt-7 shrink-0 lg:mt-0">
              <Button href="/contact" className="min-h-12 px-8">
                Talk to us
              </Button>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
