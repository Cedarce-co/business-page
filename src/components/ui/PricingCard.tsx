/*
  ┌─────────────────────────────────────────────────────────┐
  │  CEDARCE COLOUR REFERENCE — paste in every component   │
  └─────────────────────────────────────────────────────────┘
*/
"use client";

import { motion } from "framer-motion";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { glowPulse } from "@/lib/animations";

type Pricing = {
  name: string;
  price: string;
  subtitle: string;
  badge: string | null;
  featured: boolean;
  features: string[];
  cta: string;
  ctaStyle: "primary" | "secondary" | "dark";
};

export default function PricingCard({ item }: { item: Pricing }) {
  return (
    <motion.div
      animate={item.featured ? glowPulse : undefined}
      className={cn(
        "rounded-3xl border-2 p-8",
        item.featured
          ? "bg-g-card border-cliq-purple shadow-purple"
          : "border-cliq-gray-200 bg-white"
      )}
    >
      {item.badge ? <Badge variant="popular">{item.badge}</Badge> : null}
      <h3 className="mt-3 text-2xl font-black text-cliq-text-heading">{item.name}</h3>
      <p className="mt-2 text-5xl font-black text-cliq-purple">{item.price}</p>
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
      <div className="mt-8">
        <Button href="/contact" variant={item.ctaStyle} full>
          {item.cta}
        </Button>
      </div>
    </motion.div>
  );
}
