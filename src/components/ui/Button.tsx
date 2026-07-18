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
};

const styles: Record<Variant, string> = {
  primary:
    "inline-flex items-center justify-center rounded-lg border border-white/15 bg-cedar-ivory px-4 py-2.5 text-sm font-semibold text-black transition duration-200 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cedar-accent/40 active:scale-[0.98] sm:px-6 sm:py-3 sm:text-base",
  secondary:
    "inline-flex items-center justify-center rounded-lg border border-white/20 bg-transparent px-4 py-2.5 text-sm font-semibold text-cedar-ivory transition duration-200 hover:border-white/40 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25 active:scale-[0.98] sm:px-6 sm:py-3 sm:text-base",
  teal:
    "inline-flex items-center justify-center rounded-lg bg-cedar-accent px-4 py-2.5 text-sm font-semibold text-black transition duration-200 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cedar-accent/40 active:scale-[0.98] sm:px-6 sm:py-3 sm:text-base",
  dark:
    "inline-flex items-center justify-center rounded-lg bg-cedar-ivory px-4 py-2.5 text-sm font-semibold text-black transition duration-200 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 active:scale-[0.98] sm:px-6 sm:py-3 sm:text-base",
  ghost:
    "inline-flex items-center justify-center font-medium text-cedar-ivory/80 underline decoration-white/25 underline-offset-4 transition hover:text-cedar-accent hover:decoration-cedar-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cedar-accent/30",
  onDark:
    "inline-flex items-center justify-center rounded-lg border border-white/25 px-4 py-2.5 text-sm font-semibold text-white transition duration-200 hover:border-white/50 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 active:scale-[0.98] sm:px-6 sm:py-3 sm:text-base",
  onBanner:
    "inline-flex items-center justify-center rounded-lg bg-cedar-ivory px-4 py-2.5 text-sm font-semibold text-black transition duration-200 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 active:scale-[0.98] sm:px-6 sm:py-3 sm:text-base",
  accent:
    "inline-flex items-center justify-center rounded-lg bg-cedar-accent px-4 py-2.5 text-sm font-semibold text-black transition duration-200 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cedar-accent/40 active:scale-[0.98] sm:px-6 sm:py-3 sm:text-base",
  outlineLight:
    "inline-flex items-center justify-center rounded-lg border border-white/20 bg-transparent px-4 py-2.5 text-sm font-semibold text-cedar-ivory transition duration-200 hover:border-cedar-accent/60 hover:text-cedar-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cedar-accent/30 active:scale-[0.98] sm:px-6 sm:py-3 sm:text-base",
};

export default function Button({
  children,
  href,
  className,
  variant = "primary",
  full,
  onClick,
  type = "button",
}: Props) {
  const classes = cn(
    styles[variant],
    full && "w-full",
    "gap-2",
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
        <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick}>
      {children}
      <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
    </button>
  );
}
