import Link from "next/link";
import { ClipboardList, LayoutDashboard, Settings, Shield } from "lucide-react";
import Button from "@/components/ui/Button";
import SectionLabel from "@/components/ui/SectionLabel";
import { PRODUCT_FLOW, PRODUCT_MODULES, PRODUCT_PILLARS } from "@/lib/marketing-pages";

const moduleIcons = {
  layout: LayoutDashboard,
  shield: Shield,
  clipboard: ClipboardList,
  settings: Settings,
};

export default function ProductPageContent() {
  return (
    <>
      <section className="border-b border-cliq-gray-200 bg-[linear-gradient(165deg,#f8fafc_0%,#ffffff_45%,#f1f5f9_100%)]">
        <div className="mx-auto grid max-w-[1200px] gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14 lg:px-8 lg:py-24">
          <div>
            <SectionLabel className="bg-cliq-purple-soft text-cliq-purple">Product</SectionLabel>
            <h1 className="mt-6 text-4xl font-black leading-tight text-cliq-text-heading sm:text-5xl lg:text-[3.25rem]">
              The Cedarce platform — portal, verification, and delivery in one place.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-cliq-text-body">
              Not just a website agency. A productized client portal plus admin operations so onboarding, KYC, service
              requests, and status updates run on rails — for you and your customers.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/signup" variant="teal" className="rounded-xl px-6 py-3 text-sm font-bold">
                Create free account
              </Button>
              <Button href="/contact" variant="secondary" className="rounded-xl px-6 py-3 text-sm font-bold">
                Book a demo
              </Button>
            </div>
          </div>

          <div className="rounded-3xl border border-cliq-gray-200 bg-cliq-navy-900 p-6 shadow-card sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cliq-teal">What you get</p>
            <ul className="mt-5 space-y-4">
              {PRODUCT_MODULES.map((m) => {
                const Icon = moduleIcons[m.icon];
                return (
                  <li
                    key={m.title}
                    className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cliq-teal/20 text-cliq-teal">
                      <Icon className="h-5 w-5" aria-hidden />
                    </div>
                    <div>
                      <p className="font-bold text-white">{m.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-white/70">{m.desc}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-cliq-white py-16 lg:py-24">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <SectionLabel className="bg-cliq-gray-100 text-cliq-navy-800">Platform modules</SectionLabel>
          <h2 className="mt-5 max-w-2xl text-3xl font-black text-cliq-text-heading lg:text-4xl">
            Built for repeat delivery, not one-off handoffs.
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {PRODUCT_MODULES.map((m) => {
              const Icon = moduleIcons[m.icon];
              return (
                <article
                  key={m.title}
                  className="rounded-2xl border border-cliq-gray-200 bg-white p-6 shadow-card transition hover:border-cliq-purple/30"
                >
                  <Icon className="h-6 w-6 text-cliq-purple" aria-hidden />
                  <h3 className="mt-4 text-xl font-bold text-cliq-text-heading">{m.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-cliq-text-body">{m.desc}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-cliq-gray-200 bg-cliq-gray-50 py-16 lg:py-24">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-cliq-text-heading lg:text-4xl">How the product works</h2>
          <p className="mt-3 max-w-2xl text-cliq-text-body">
            A single journey from signup to verified client to tracked delivery — visible on both sides.
          </p>
          <ol className="relative mt-12 grid gap-8 lg:grid-cols-4 lg:gap-6">
            {PRODUCT_FLOW.map((item, i) => (
              <li key={item.step} className="relative lg:pt-2">
                {i < PRODUCT_FLOW.length - 1 ? (
                  <span
                    aria-hidden
                    className="absolute left-[1.125rem] top-12 hidden h-[calc(100%+1rem)] w-px bg-cliq-gray-300 lg:left-auto lg:right-0 lg:top-6 lg:h-px lg:w-full lg:translate-x-1/2"
                  />
                ) : null}
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-cliq-navy-900 text-xs font-black text-white">
                  {item.step}
                </span>
                <h3 className="mt-4 text-lg font-bold text-cliq-text-heading">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cliq-text-body">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-cliq-navy-800 py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cliq-teal">Delivery pillars</p>
          <h2 className="mt-4 max-w-3xl text-3xl font-black text-white lg:text-4xl">
            The platform orchestrates work across five service pillars we implement for you.
          </h2>
          <div className="mt-8 flex flex-wrap gap-2">
            {PRODUCT_PILLARS.map((p) => (
              <Link
                key={p.slug}
                href={p.href}
                className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                {p.label}
              </Link>
            ))}
          </div>
          <p className="mt-6 max-w-2xl text-sm text-white/70">
            Need outcome-based browsing instead? See{" "}
            <Link href="/services" className="font-semibold text-cliq-teal underline underline-offset-4">
              Solutions by business type
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-6 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <div>
            <h2 className="text-2xl font-black text-cliq-text-heading sm:text-3xl">Try the product</h2>
            <p className="mt-2 max-w-lg text-cliq-text-body">
              Create an account, complete verification, and submit a service request — the same flow your clients will use.
            </p>
          </div>
          <Button href="/signup" variant="teal" className="rounded-xl px-8 py-3 text-sm font-bold">
            Get started for free
          </Button>
        </div>
      </section>
    </>
  );
}
