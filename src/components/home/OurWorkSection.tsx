"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import AnimatedHeadline from "@/components/motion/AnimatedHeadline";
import Reveal, { RevealGroup, RevealGroupItem } from "@/components/motion/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import { PORTFOLIO, type PortfolioItem } from "@/lib/portfolio";

function WorkCard({ item, featured }: { item: PortfolioItem; featured: boolean }) {
  const body = (
    <>
      <div className="relative aspect-[16/9] overflow-hidden rounded-[1.5rem] bg-hero-blue">
        {item.image ? (
          <Image
            src={item.image}
            alt={`${item.name} website`}
            fill
            sizes={featured ? "(min-width: 1024px) 1100px, 100vw" : "(min-width: 1024px) 540px, 100vw"}
            className="object-cover object-left-top transition duration-700 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="font-display text-3xl font-semibold tracking-[-0.04em] text-white/90">{item.name}</span>
          </div>
        )}
        {item.url ? (
          <span className="glass-blue absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-white opacity-0 transition duration-300 group-hover:opacity-100">
            <ArrowUpRight className="h-5 w-5" aria-hidden />
          </span>
        ) : null}
      </div>
      <div className="px-2 pb-2 pt-5">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="text-xl font-semibold tracking-tight text-brand-950">{item.name}</h3>
          <p className="text-sm font-medium text-brand-600">{item.kind}</p>
        </div>
        <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-slate-500">{item.summary}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {item.services.map((s) => (
            <span key={s} className="rounded-full border border-line bg-brand-50/60 px-3 py-1 text-xs font-semibold text-brand-700">
              {s}
            </span>
          ))}
        </div>
      </div>
    </>
  );

  const className =
    "group block h-full rounded-[2rem] border border-line bg-white p-3 shadow-soft transition duration-500 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift";

  return item.url ? (
    <a href={item.url} target="_blank" rel="noopener noreferrer" className={className}>
      {body}
    </a>
  ) : (
    <div className={className}>{body}</div>
  );
}

/** Real client work. Renders nothing until `PORTFOLIO` has entries. */
export default function OurWorkSection() {
  if (PORTFOLIO.length === 0) return null;

  return (
    <section id="our-work" className="bg-white py-20 lg:py-32">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <SectionLabel>Our work</SectionLabel>
          </Reveal>
          <AnimatedHeadline
            text={"Real sites for\n*real businesses.*"}
            className="mt-5 font-display text-[2.1rem] font-semibold leading-[1.02] tracking-[-0.04em] text-brand-950 sm:text-5xl lg:text-[4rem]"
          />
        </div>

        <RevealGroup className="mt-12 grid gap-5 lg:mt-16 lg:grid-cols-2" stagger={0.1}>
          {PORTFOLIO.map((item, i) => (
            <RevealGroupItem key={item.name} className={i === 0 && PORTFOLIO.length % 2 === 1 ? "lg:col-span-2" : undefined}>
              <WorkCard item={item} featured={i === 0 && PORTFOLIO.length % 2 === 1} />
            </RevealGroupItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
