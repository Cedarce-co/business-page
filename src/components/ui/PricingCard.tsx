"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import Button from "@/components/ui/Button";
import { useCurrency } from "@/components/layout/CurrencyProvider";
import { cn } from "@/lib/utils";

type Pricing = {
  name: string;
  slug: string;
  price: string;
  subtitle: string;
  badge: string | null;
  featured: boolean;
  features: string[];
  cta: string;
  ctaStyle: "primary" | "secondary" | "dark";
};

export default function PricingCard({ item, activeSlug }: { item: Pricing; activeSlug?: string }) {
  const { formatPackagePrice } = useCurrency();
  const priceLabel = formatPackagePrice(item.slug) || item.price.trim();
  const showPrice = priceLabel.length > 0;
  const detailHref = `/pricing/${item.slug}`;
  const requestHref = `/request-service?package=${encodeURIComponent(item.name)}`;
  const isActive = activeSlug === item.slug;

  const featured = item.featured;

  return (
    <div
      className={cn(
        "relative isolate flex h-full flex-col overflow-hidden rounded-[2rem] p-7 transition duration-500 hover:-translate-y-1 sm:p-8",
        featured
          ? "bg-deep-blue text-white shadow-lift"
          : "border border-line bg-white shadow-soft hover:border-brand-200 hover:shadow-lift",
        isActive && (featured ? "ring-4 ring-brand-300/60" : "ring-4 ring-brand-100"),
      )}
    >
      {featured ? (
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-line-grid-light opacity-50 [mask-image:linear-gradient(to_bottom,#000,transparent_60%)]" />
      ) : null}
      <div className="flex min-h-7 items-center justify-between gap-3">
        <h3 className={cn("font-display text-2xl font-semibold tracking-tight", featured ? "text-white" : "text-brand-950")}>
          {item.name}
        </h3>
        {item.badge ? (
          <span
            className={cn(
              "rounded-full px-3 py-1 text-[11px] font-semibold",
              featured ? "bg-white text-brand-700" : "bg-brand-50 text-brand-700",
            )}
          >
            {item.badge}
          </span>
        ) : null}
      </div>
      {showPrice ? (
        <p className={cn("mt-5 font-display text-3xl font-semibold tracking-[-0.03em] sm:text-4xl", featured ? "text-white" : "text-gradient")}>
          {priceLabel}
        </p>
      ) : (
        <p className={cn("mt-5 font-display text-2xl font-semibold tracking-tight", featured ? "text-white" : "text-brand-950")}>
          Price agreed with you
        </p>
      )}
      <p className={cn("mt-2 text-sm", featured ? "text-brand-100/85" : "text-slate-500")}>{item.subtitle}</p>
      <div className={cn("my-6 h-px", featured ? "bg-white/15" : "bg-line")} />
      <ul className="flex-1 space-y-3">
        {item.features.map((feature) => (
          <li key={feature} className={cn("flex gap-2.5 text-[15px]", featured ? "text-brand-50" : "text-slate-600")}>
            <span
              className={cn(
                "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                featured ? "bg-white/15 text-white" : "bg-brand-50 text-brand-600",
              )}
            >
              <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
            </span>
            {feature}
          </li>
        ))}
      </ul>
      <div className="relative z-20 mt-8 space-y-3">
        <Button href={requestHref} variant={featured ? "onBanner" : "primary"} full>
          {item.cta}
        </Button>
        {!isActive ? (
          <Link
            href={detailHref}
            className={cn(
              "block text-center text-sm font-semibold underline-offset-4 hover:underline",
              featured ? "text-brand-100 hover:text-white" : "text-slate-500 hover:text-brand-600",
            )}
          >
            View {item.name} details →
          </Link>
        ) : null}
      </div>
    </div>
  );
}
