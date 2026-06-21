"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { glowPulse } from "@/lib/animations";

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
  const priceIsText = true;
  const detailHref = `/pricing/${item.slug}`;
  const requestHref = `/request-service?package=${encodeURIComponent(item.name)}`;
  const isActive = activeSlug === item.slug;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border-2 p-8",
        item.featured
          ? "bg-g-card border-cliq-purple shadow-purple"
          : "border-cliq-gray-200 bg-white",
        isActive && "ring-2 ring-cliq-purple ring-offset-2"
      )}
    >
      {item.featured ? (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-3xl"
          animate={glowPulse}
        />
      ) : null}
      <div className="relative z-10">
        {item.badge ? <Badge variant="popular">{item.badge}</Badge> : null}
        <h3 className="mt-3 text-2xl font-black text-cliq-text-heading">{item.name}</h3>
        {showPrice ? (
          <p
            className={cn(
              "mt-2 font-black text-cliq-purple",
              priceIsText ? "text-3xl leading-tight tracking-tight lg:text-4xl" : "text-5xl"
            )}
          >
            {item.price}
          </p>
        ) : null}
        <p className="mt-1 text-sm text-cliq-text-muted">{item.subtitle}</p>
        <div className="my-6 border-t border-cliq-gray-200" />
        <ul className="space-y-3">
          {item.features.map((feature) => (
            <li key={feature} className="text-sm text-cliq-text-body">
              <span className="mr-2 font-bold text-cliq-teal">✓</span>
              {feature}
            </li>
          ))}
        </ul>
        <div className="relative z-20 mt-8 space-y-3">
          <Button
            href={requestHref}
            variant={item.ctaStyle}
            full
            className={cn(
              item.ctaStyle === "primary" && "text-cliq-navy-900",
              item.ctaStyle === "secondary" && "text-cliq-navy-900",
              item.ctaStyle === "dark" && "text-white"
            )}
          >
            {item.cta}
          </Button>
          {!isActive ? (
            <Link
              href={detailHref}
              className="block text-center text-sm font-semibold text-cliq-purple underline-offset-4 hover:underline"
            >
              View {item.name} package details →
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}
