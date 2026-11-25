"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { useCurrency } from "@/components/layout/CurrencyProvider";
import { getCurrency, type CurrencyCode } from "@/lib/currency";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  /** Compact control for top bars */
  size?: "sm" | "md";
};

export default function CurrencySwitcher({ className, size = "sm" }: Props) {
  const { currency, setCurrency, options } = useCurrency();
  const current = getCurrency(currency);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const listId = useId();

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (rootRef.current && target && !rootRef.current.contains(target)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const select = (code: CurrencyCode) => {
    setCurrency(code);
    setOpen(false);
  };

  return (
    <div ref={rootRef} className={cn("relative inline-flex", className)}>
      <button
        type="button"
        aria-label={`Currency: ${current.name}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border border-line bg-white/80 font-semibold text-brand-800 shadow-soft outline-none backdrop-blur-xl transition",
          "hover:border-brand-200 hover:bg-white focus-visible:ring-4 focus-visible:ring-brand-100",
          size === "sm" ? "min-h-9 px-3 text-xs" : "min-h-10 px-3.5 text-sm",
        )}
      >
        <span className="text-base leading-none" aria-hidden>
          {current.flag}
        </span>
        <span className="text-[11px] font-semibold tracking-wide text-brand-800">
          {current.code}
        </span>
        <ChevronDown
          className={cn(
            "text-brand-400 transition",
            size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4",
            open && "rotate-180",
          )}
          aria-hidden
        />
      </button>

      {open ? (
        <ul
          id={listId}
          role="listbox"
          aria-label="Select pricing currency"
          className="absolute right-0 top-[calc(100%+0.5rem)] z-50 min-w-[9.5rem] overflow-hidden rounded-2xl border border-line bg-white p-1 shadow-lift"
        >
          {options.map((opt) => {
            const selected = opt.code === currency;
            return (
              <li key={opt.code} role="option" aria-selected={selected}>
                <button
                  type="button"
                  onClick={() => select(opt.code)}
                  className={cn(
                    "flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-sm transition",
                    selected
                      ? "bg-brand-50 text-brand-800"
                      : "text-slate-600 hover:bg-brand-50/60 hover:text-brand-800",
                  )}
                >
                  <span className="text-base leading-none" aria-hidden>
                    {opt.flag}
                  </span>
                  <span className="font-semibold tracking-wide">{opt.code}</span>
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
