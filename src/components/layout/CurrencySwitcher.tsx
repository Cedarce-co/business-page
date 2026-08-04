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
          "inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-black/50 font-semibold text-cedar-ivory outline-none transition",
          "hover:border-white/30 focus-visible:ring-2 focus-visible:ring-cedar-accent/40",
          size === "sm" ? "min-h-9 px-2 text-xs" : "min-h-10 px-2.5 text-sm",
        )}
      >
        <span className="text-base leading-none" aria-hidden>
          {current.flag}
        </span>
        <span className="text-[11px] font-semibold tracking-wide text-cedar-ivory/90">
          {current.code}
        </span>
        <ChevronDown
          className={cn(
            "text-white/60 transition",
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
          className="absolute right-0 top-[calc(100%+0.35rem)] z-50 min-w-[9.5rem] overflow-hidden rounded-lg border border-white/15 bg-zinc-950 py-1 shadow-xl"
        >
          {options.map((opt) => {
            const selected = opt.code === currency;
            return (
              <li key={opt.code} role="option" aria-selected={selected}>
                <button
                  type="button"
                  onClick={() => select(opt.code)}
                  className={cn(
                    "flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm transition",
                    selected
                      ? "bg-cedar-accent/15 text-cedar-ivory"
                      : "text-cedar-mist hover:bg-white/5 hover:text-cedar-ivory",
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
