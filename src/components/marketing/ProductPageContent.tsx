import Link from "next/link";
import { ClipboardList, LayoutDashboard, Settings, Shield } from "lucide-react";
import Button from "@/components/ui/Button";
import MarketingPageHeader from "@/components/navigation/MarketingPageHeader";
import SectionLabel from "@/components/ui/SectionLabel";
import SectionReveal, { RevealItem, StaggerReveal } from "@/components/ui/SectionReveal";
import { PRODUCT_FLOW, PRODUCT_MODULES, PRODUCT_PILLARS } from "@/lib/marketing-pages";
import { ruledBlockTop, ruledCell, ruledGridCols, ruledGridColsLg, ruledSplit, ruledSplitCell } from "@/lib/ruled-layout";
import { cn } from "@/lib/utils";

const moduleIcons = {
  layout: LayoutDashboard,
  shield: Shield,
  clipboard: ClipboardList,
  settings: Settings,
};

export default function ProductPageContent() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-cliq-gray-200 bg-mesh-light">
        <MarketingPageHeader tone="light" className="pb-2" />
        <div className="mx-auto flex max-w-[1200px] flex-col items-center px-4 py-8 text-center sm:px-6 lg:px-8 lg:pb-24 lg:pt-4">
          <SectionLabel className="mx-auto">Product</SectionLabel>
          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-black leading-tight text-cliq-text-heading sm:text-5xl lg:text-[3.25rem]">
            The Cedarce platform: portal, verification, and delivery in one place.
          </h1>
          <p className="mt-5 max-w-3xl text-balance text-center text-lg leading-relaxed text-cliq-text-body">
            Not just a website agency. A productized client portal plus admin operations so onboarding, KYC, service
            requests, and status updates run on rails for you and your customers.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/signup" variant="teal" className="rounded-xl px-6 py-3 text-sm font-bold">
              Create free account
            </Button>
            <Button href="/contact" variant="secondary" className="rounded-xl px-6 py-3 text-sm font-bold">
              Book a demo
            </Button>
          </div>

          <div className={cn("mx-auto mt-12 max-w-xl bg-cliq-navy-900 px-0 py-8 text-left sm:px-8", ruledBlockTop)}>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cliq-teal">What you get</p>
            <ul className="mt-5 divide-y divide-white/10">
              {PRODUCT_MODULES.map((m) => {
                const Icon = moduleIcons[m.icon];
                return (
                  <li key={m.title} className="flex gap-4 py-4 first:pt-0">
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

      <SectionReveal className="bg-cliq-white py-16 lg:py-24">
        <div className="mx-auto max-w-[1200px] px-4 text-center sm:px-6 lg:px-8">
          <SectionLabel className="mx-auto">Platform modules</SectionLabel>
          <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-black text-cliq-text-heading lg:text-4xl">
            Built for repeat delivery, not one-off handoffs.
          </h2>
          <StaggerReveal className={cn("mt-10", ruledGridCols(2))}>
            {PRODUCT_MODULES.map((m) => {
              const Icon = moduleIcons[m.icon];
              return (
                <RevealItem key={m.title}>
                <article className={cn("h-full", ruledCell)}>
                  <Icon className="h-6 w-6 text-cliq-purple" aria-hidden />
                  <h3 className="mt-4 text-xl font-bold text-cliq-text-heading">{m.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-cliq-text-body">{m.desc}</p>
                </article>
                </RevealItem>
              );
            })}
          </StaggerReveal>
        </div>
      </SectionReveal>

      <SectionReveal className="border-y border-cliq-gray-200 bg-cliq-gray-50 py-16 lg:py-24">
        <div className="mx-auto max-w-[1200px] px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-cliq-text-heading lg:text-4xl">How the product works</h2>
          <p className="mx-auto mt-3 max-w-2xl text-cliq-text-body">
            A single journey from signup to verified client to tracked delivery, visible on both sides.
          </p>
          <ol className="relative mx-auto mt-12 max-w-2xl space-y-8 border-l-2 border-cliq-gray-200 pl-8 text-left">
            {PRODUCT_FLOW.map((item, i) => (
              <li key={item.step} className="relative">
                <span className="absolute -left-[2.125rem] top-0 inline-flex h-9 w-9 items-center justify-center rounded-full bg-cliq-navy-900 text-xs font-black text-white ring-4 ring-cliq-gray-50">
                  {item.step}
                </span>
                <h3 className="text-lg font-bold text-cliq-text-heading">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cliq-text-body">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </SectionReveal>

      <section className="relative overflow-hidden bg-cliq-navy-800 py-16 lg:py-20">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-mesh-dark opacity-70" />
        <div className="relative mx-auto max-w-[1200px] px-4 text-center sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cliq-teal">Delivery pillars</p>
          <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-black text-white lg:text-4xl">
            The platform orchestrates work across five service pillars we implement for you.
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
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
          <p className="mx-auto mt-6 max-w-2xl text-sm text-white/70">
            Need outcome-based browsing instead? See{" "}
            <Link href="/services" className="font-semibold text-cliq-teal underline underline-offset-4">
              Solutions by business type
            </Link>
            .
          </p>
        </div>
      </section>

      <SectionReveal className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-cliq-text-heading sm:text-3xl">Try the product</h2>
          <p className="mx-auto mt-2 max-w-lg text-cliq-text-body">
            Create an account, complete verification, and submit a service request: the same flow your clients will use.
          </p>
          <Button href="/signup" variant="teal" className="mt-6 rounded-xl px-8 py-3 text-sm font-bold">
            Get started for free
          </Button>
        </div>
      </SectionReveal>
    </>
  );
}
