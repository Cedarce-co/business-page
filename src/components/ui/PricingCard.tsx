"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import Button from "@/components/ui/Button";
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
  const showPrice = item.price.trim().length > 0;
  const detailHref = `/pricing/${item.slug}`;
  const requestHref = `/request-service?package=${encodeURIComponent(item.name)}`;
  const isActive = activeSlug === item.slug;

  return (
    <div
      className={cn(
        "relative h-full border border-white/10 bg-zinc-950 p-8 transition",
        item.featured && "border-cedar-accent/40 bg-black",
        isActive && "ring-1 ring-cedar-accent"
      )}
    >
      <div className="relative z-10">
        {item.badge ? (
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cedar-accent">
            {item.badge}
          </span>
        ) : (
          <span className="invisible text-[11px]">—</span>
        )}
        <h3 className="mt-3 font-display text-3xl text-cedar-ivory">{item.name}</h3>
        {showPrice ? (
          <p className="mt-2 text-3xl font-semibold text-cedar-accent">{item.price}</p>
        ) : null}
        <p className="mt-2 text-sm text-cedar-mist">{item.subtitle}</p>
        <div className="my-6 border-t border-white/10" />
        <ul className="space-y-3">
          {item.features.map((feature) => (
            <li key={feature} className="flex gap-2 text-sm text-cedar-ivory/85">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-cedar-accent" aria-hidden />
              {feature}
            </li>
          ))}
        </ul>
        <div className="relative z-20 mt-8 space-y-3">
          <Button href={requestHref} variant={item.featured ? "accent" : "outlineLight"} full>
            {item.cta}
          </Button>
          {!isActive ? (
            <Link
              href={detailHref}
              className="block text-center text-sm font-semibold text-cedar-mist underline-offset-4 hover:text-cedar-accent hover:underline"
            >
              View {item.name} details →
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}
