export type CurrencyCode = "NGN" | "USD" | "GHS" | "KES";

export type CurrencyOption = {
  code: CurrencyCode;
  /** Display symbol for price labels */
  symbol: string;
  /** ISO country flag emoji for the switcher */
  flag: string;
  /** Longer name for accessibility */
  name: string;
};

export const CURRENCIES: CurrencyOption[] = [
  { code: "NGN", symbol: "₦", flag: "🇳🇬", name: "Nigerian Naira" },
  { code: "USD", symbol: "$", flag: "🇺🇸", name: "US Dollar" },
  { code: "GHS", symbol: "GH₵", flag: "🇬🇭", name: "Ghana Cedi" },
  { code: "KES", symbol: "KSh", flag: "🇰🇪", name: "Kenya Shilling" },
];

export const DEFAULT_CURRENCY: CurrencyCode = "NGN";

/** Bumped when default selection rules change so old choices do not override NGN. */
export const CURRENCY_STORAGE_KEY = "cedarce-currency-v2";
export const CURRENCY_STORAGE_KEY_LEGACY = "cedarce-currency";

/** Floor amounts for “as low as” pricing by package slug. */
export const PACKAGE_FLOOR_AMOUNTS: Record<
  string,
  Partial<Record<CurrencyCode, number>> | null
> = {
  starter: {
    NGN: 150_000,
    USD: 250,
    GHS: 3_750,
    KES: 32_500,
  },
  business: {
    NGN: 500_000,
    USD: 700,
    GHS: 10_500,
    KES: 91_000,
  },
  enterprise: null,
};

export function isCurrencyCode(value: string | null | undefined): value is CurrencyCode {
  return CURRENCIES.some((c) => c.code === value);
}

export function getCurrency(code: CurrencyCode): CurrencyOption {
  return CURRENCIES.find((c) => c.code === code) ?? CURRENCIES[0]!;
}

export function formatFloorPrice(amount: number, code: CurrencyCode): string {
  const formatted = amount.toLocaleString("en-US");
  if (code === "USD") return `As low as $${formatted}`;
  if (code === "KES") return `As low as KSh ${formatted}`;
  if (code === "GHS") return `As low as GH₵${formatted}`;
  return `As low as ₦${formatted}`;
}

export function packagePriceLabel(slug: string, code: CurrencyCode): string {
  const amounts = PACKAGE_FLOOR_AMOUNTS[slug];
  if (!amounts) return "";
  const amount = amounts[code];
  if (amount == null) return "";
  return formatFloorPrice(amount, code);
}
