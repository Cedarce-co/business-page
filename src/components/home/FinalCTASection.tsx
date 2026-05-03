"use client";

import Button from "@/components/ui/Button";

export default function FinalCTASection() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-cliq-gray-200 bg-white px-6 py-12 shadow-card sm:px-10 lg:px-14">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              background:
                "radial-gradient(1200px 300px at 20% 35%, rgba(2,132,199,0.12), transparent 60%),radial-gradient(900px 260px at 70% 40%, rgba(16,185,129,0.10), transparent 58%),radial-gradient(1000px 260px at 50% 65%, rgba(99,102,241,0.10), transparent 60%)",
            }}
          />
          <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:radial-gradient(#111122_1px,transparent_1px)] [background-size:18px_18px]" />

          <div className="relative grid items-start gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="flex min-w-0 flex-col items-center text-center md:max-w-[600px] md:items-start md:text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cliq-text-muted">Trust</p>
              <h2 className="mt-3 text-3xl font-black leading-tight text-cliq-text-heading sm:text-4xl lg:text-5xl">
                Look credible where people check first.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-cliq-text-body">
                When details are thin or inconsistent, people naturally grow skeptical. A clear website, business email,
                and professional touchpoints help you show up the way buyers expect. First impressions happen online. Make
                yours count.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-stretch">
              <Button
                href="/signup"
                variant="secondary"
                className="rounded-xl border-2 !border-emerald-600 bg-white px-6 py-3 text-sm font-bold !text-cliq-navy-800 shadow-sm transition hover:!border-emerald-700 hover:bg-emerald-50 whitespace-nowrap"
              >
                Get started for free
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
