"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  CURRENCY_STORAGE_KEY,
  CURRENCY_STORAGE_KEY_LEGACY,
  CURRENCIES,
  DEFAULT_CURRENCY,
  isCurrencyCode,
  packagePriceLabel,
  type CurrencyCode,
  type CurrencyOption,
} from "@/lib/currency";

type CurrencyContextValue = {
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  options: CurrencyOption[];
  formatPackagePrice: (slug: string) => string;
};

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

function readStoredCurrency(): CurrencyCode {
  if (typeof window === "undefined") return DEFAULT_CURRENCY;
  try {
    const current = window.localStorage.getItem(CURRENCY_STORAGE_KEY);
    if (isCurrencyCode(current)) return current;
    // Drop legacy key so an old USD test selection does not stick.
    window.localStorage.removeItem(CURRENCY_STORAGE_KEY_LEGACY);
  } catch {
    // ignore
  }
  return DEFAULT_CURRENCY;
}

export default function CurrencyProvider({ children }: { children: ReactNode }) {
  // Always start NGN for SSR + first paint; hydrate preference after mount.
  const [currency, setCurrencyState] = useState<CurrencyCode>(DEFAULT_CURRENCY);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setCurrencyState(readStoredCurrency());
    setHydrated(true);
  }, []);

  const setCurrency = useCallback((code: CurrencyCode) => {
    setCurrencyState(code);
    try {
      window.localStorage.setItem(CURRENCY_STORAGE_KEY, code);
      window.localStorage.removeItem(CURRENCY_STORAGE_KEY_LEGACY);
    } catch {
      // ignore
    }
  }, []);

  const value = useMemo<CurrencyContextValue>(
    () => ({
      currency: hydrated ? currency : DEFAULT_CURRENCY,
      setCurrency,
      options: CURRENCIES,
      formatPackagePrice: (slug: string) =>
        packagePriceLabel(slug, hydrated ? currency : DEFAULT_CURRENCY),
    }),
    [currency, setCurrency, hydrated],
  );

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) {
    throw new Error("useCurrency must be used within CurrencyProvider");
  }
  return ctx;
}
