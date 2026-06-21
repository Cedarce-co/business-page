"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import SectionLabel from "@/components/ui/SectionLabel";
import ServiceCard from "@/components/ui/ServiceCard";
import { SERVICES } from "@/lib/constants";
import { SOLUTION_OUTCOMES, SOLUTION_SEGMENTS } from "@/lib/marketing-pages";

const outcomeStyles = {
  emerald: "border-emerald-200 bg-emerald-50/80 from-emerald-500/10",
  cyan: "border-cyan-200 bg-cyan-50/80 from-cyan-500/10",
  purple: "border-violet-200 bg-violet-50/80 from-violet-500/10",
};

export default function SolutionsPageContent() {
  return (
    <>
      <section className="relative overflow-hidden bg-cliq-navy-900 pb-20 pt-0">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(800px 400px at 15% 20%, rgba(45,212,191,0.25), transparent 55%), radial-gradient(700px 350px at 85% 30%, rgba(99,102,241,0.2), transparent 50%)",
          }}
        />
        <div className="relative mx-auto max-w-[1200px] px-4 text-center sm:px-6 lg:px-8">
          <SectionLabel className="mx-auto bg-cliq-navy-700 text-cliq-teal">Solutions</SectionLabel>
          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-black text-white sm:text-5xl lg:text-6xl">
            Outcomes for your stage — not a generic service list.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/75">
            Whether you are launching solo or running a team, pick the business situation that matches yours. We map
            the right mix of web, payments, email, and campaigns.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {SOLUTION_SEGMENTS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                {s.title.split(" ")[0]}…
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="segments" className="bg-cliq-white py-16 lg:py-24">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <SectionLabel className="bg-cliq-teal/15 text-cliq-navy-900">By business type</SectionLabel>
          <h2 className="mt-5 max-w-2xl text-3xl font-black text-cliq-text-heading lg:text-4xl">
            Start with the problem you are solving today.
          </h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {SOLUTION_SEGMENTS.map((s) => (
              <article
                key={s.id}
                id={s.id}
                className="scroll-mt-28 rounded-2xl border border-cliq-gray-200 bg-white p-6 shadow-card lg:p-8"
              >
                <h3 className="text-xl font-black text-cliq-text-heading">{s.title}</h3>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl bg-rose-50/80 p-4">
                    <p className="text-xs font-bold uppercase tracking-wide text-rose-700">The pain</p>
                    <p className="mt-2 text-sm leading-relaxed text-cliq-text-body">{s.pain}</p>
                  </div>
                  <div className="rounded-xl bg-emerald-50/80 p-4">
                    <p className="text-xs font-bold uppercase tracking-wide text-emerald-800">The outcome</p>
                    <p className="mt-2 text-sm leading-relaxed text-cliq-text-body">{s.outcome}</p>
                  </div>
                </div>
                <Link
                  href={s.href}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-cliq-navy-900 underline-offset-4 hover:underline"
                >
                  {s.cta}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-cliq-gray-200 bg-cliq-gray-50 py-16 lg:py-24">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-black text-cliq-text-heading lg:text-4xl">Three jobs we get hired for</h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-cliq-text-body">
            Most clients need one of these outcomes first — then expand the stack over time.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {SOLUTION_OUTCOMES.map((o) => (
              <Link
                key={o.title}
                href={o.href}
                className={`group rounded-2xl border bg-gradient-to-br to-white p-6 shadow-card transition hover:-translate-y-0.5 ${outcomeStyles[o.tone]}`}
              >
                <h3 className="text-xl font-black text-cliq-text-heading">{o.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-cliq-text-body">{o.desc}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-cliq-navy-900">
                  Explore
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cliq-white py-16 lg:py-24">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 border-b border-cliq-gray-200 pb-8 md:flex-row md:items-end md:justify-between">
            <div>
              <SectionLabel className="bg-cliq-purple-soft text-cliq-purple">Service pillars</SectionLabel>
              <h2 className="mt-4 text-3xl font-black text-cliq-text-heading lg:text-4xl">Pick a pillar to go deeper</h2>
              <p className="mt-3 max-w-xl text-cliq-text-body">
                Each pillar has a dedicated page with deliverables, who it&apos;s for, and how to start.
              </p>
            </div>
            <Button href="/contact" variant="secondary" className="shrink-0 rounded-xl px-6 py-3 text-sm font-bold">
              Not sure? Talk to us
            </Button>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cliq-navy-900 py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-white lg:text-4xl">Want to see the platform behind delivery?</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/70">
            Solutions describe what we solve. The Product page shows how Cedarce runs verification, requests, and admin
            operations as software.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/about" variant="onDark" className="rounded-xl px-6 py-3 text-sm font-bold">
              View product
            </Button>
            <Button href="/signup" variant="teal" className="rounded-xl px-6 py-3 text-sm font-bold">
              Create account
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
