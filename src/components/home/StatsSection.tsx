"use client";

import { Banknote, Layers, MessageCircle } from "lucide-react";
import AnimatedHeadline from "@/components/motion/AnimatedHeadline";
import Reveal, { RevealGroup, RevealGroupItem } from "@/components/motion/Reveal";
import Button from "@/components/ui/Button";

/** Promises we control (no client counts or results we can't show yet). */
const promises = [
  { icon: Banknote, title: "Prices in Naira, up front", body: "See what each package costs before you talk to us. No surprise quotes." },
  { icon: Layers, title: "One team for everything", body: "Domain, website, business email, invoices and payments, set up together." },
  { icon: MessageCircle, title: "Talk to us first", body: "A short call on WhatsApp to agree what you need and when it will be ready." },
];

export default function StatsSection() {
  return (
    <section className="relative bg-white pb-16 pt-28 sm:pt-32 lg:pb-24 lg:pt-44">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <AnimatedHeadline
            text={"Everything your business\nneeds to look *professional.*"}
            className="max-w-3xl font-display text-[2.1rem] font-semibold leading-[1.02] tracking-[-0.04em] text-brand-950 sm:text-5xl lg:text-[4rem]"
          />
          <Reveal delay={0.2} className="shrink-0">
            <Button href="/pricing" className="min-h-12">
              See packages
            </Button>
          </Reveal>
        </div>

        <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-3 lg:mt-14 lg:gap-5" stagger={0.1}>
          {promises.map(({ icon: Icon, title, body }) => (
            <RevealGroupItem key={title}>
              <div className="group flex h-full items-start gap-4 rounded-[1.75rem] border border-line bg-white p-5 shadow-soft transition duration-500 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift sm:p-6">
                <span className="btn-sheen flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-g-button text-white shadow-glow-sm transition duration-500 group-hover:rotate-[-6deg] group-hover:scale-105">
                  <Icon className="h-6 w-6" aria-hidden />
                </span>
                <div className="min-w-0">
                  <p className="text-lg font-semibold tracking-tight text-brand-950">{title}</p>
                  <p className="mt-1 text-sm leading-snug text-slate-500">{body}</p>
                </div>
              </div>
            </RevealGroupItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
