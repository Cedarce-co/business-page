"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant =
  | "primary"
  | "secondary"
  | "teal"
  | "dark"
  | "ghost"
  | "onDark"
  | "onBanner"
  | "accent"
  | "outlineLight";

type Props = {
  children: ReactNode;
  href?: string;
  className?: string;
  variant?: Variant;
  full?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
  /** Hide the trailing arrow icon. */
  noArrow?: boolean;
};

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition duration-300 ease-out focus-visible:outline-none focus-visible:ring-4 active:scale-[0.97] sm:px-6 sm:py-3 sm:text-[15px]";

/** Glossy Cedarce-blue pill */
const solid = cn(
  base,
  "btn-sheen bg-g-button text-white shadow-glow-sm hover:-translate-y-0.5 hover:shadow-glow focus-visible:ring-brand-300/60",
);

/** White pill with a hairline border */
const outline = cn(
  base,
  "border border-line bg-white text-brand-800 shadow-soft hover:-translate-y-0.5 hover:border-brand-200 hover:bg-brand-50 focus-visible:ring-brand-200",
);

const styles: Record<Variant, string> = {
  primary: solid,
  accent: solid,
  teal: solid,
  dark: cn(
    base,
    "btn-sheen bg-brand-800 text-white shadow-lift hover:-translate-y-0.5 hover:bg-brand-700 focus-visible:ring-brand-300/60",
  ),
  secondary: outline,
  outlineLight: outline,
  ghost:
    "group inline-flex items-center justify-center gap-1.5 font-semibold text-brand-600 transition hover:text-brand-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-200 rounded-md",
  onBanner: cn(
    base,
    "bg-white text-brand-700 shadow-lift hover:-translate-y-0.5 hover:bg-brand-50 focus-visible:ring-white/40",
  ),
  onDark: cn(base, "glass-blue text-white hover:-translate-y-0.5 hover:bg-white/20 focus-visible:ring-white/40"),
};

export default function Button({
  children,
  href,
  className,
  variant = "primary",
  full,
  onClick,
  type = "button",
  noArrow = false,
}: Props) {
  const classes = cn(styles[variant], full && "w-full", className);

  const arrow = noArrow ? null : (
    <ArrowRight
      className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5"
      aria-hidden
    />
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
        {arrow}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick}>
      {children}
      {arrow}
    </button>
  );
}
