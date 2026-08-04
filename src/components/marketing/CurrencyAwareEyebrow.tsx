"use client";

import { useCurrency } from "@/components/layout/CurrencyProvider";

type Props = {
  slug: string;
  category: string;
  fallback: string;
  className?: string;
};

/** Replaces “as low as …” on package detail eyebrows when a floor price exists. */
export default function CurrencyAwareEyebrow({ slug, category, fallback, className }: Props) {
  const { formatPackagePrice } = useCurrency();
  const floorPrice =
    category === "pricing" && (slug === "starter" || slug === "business")
      ? formatPackagePrice(slug)
      : "";
  const text =
    floorPrice.length > 0 ? fallback.replace(/as low as.+$/i, floorPrice) : fallback;

  return <p className={className}>{text}</p>;
}
