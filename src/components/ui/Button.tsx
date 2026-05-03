/*
  ┌─────────────────────────────────────────────────────────┐
  │  CEDARCE COLOUR REFERENCE - paste in every component   │
  └─────────────────────────────────────────────────────────┘
*/
"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant =
  | "primary"
  | "secondary"
  | "teal"
  | "dark"
  | "ghost"
  | "onDark"
  | "onBanner";

type Props = {
  children: ReactNode;
  href?: string;
  className?: string;
  variant?: Variant;
  full?: boolean;
  onClick?: () => void;
};

const styles: Record<Variant, string> = {
  primary:
    "inline-flex items-center justify-center border border-cliq-gray-300 bg-white px-6 py-3 text-cliq-navy-900 shadow-card rounded-xl font-semibold transition hover:bg-cliq-gray-100",
  secondary:
    "inline-flex items-center justify-center border-2 border-cliq-gray-300 bg-white px-6 py-3 text-cliq-navy-800 rounded-xl font-semibold transition hover:bg-cliq-gray-100",
  teal: "inline-flex items-center justify-center bg-cliq-teal text-cliq-navy-900 px-6 py-3 rounded-xl font-bold transition",
  dark: "inline-flex items-center justify-center bg-cliq-navy-800 text-white px-6 py-3 rounded-xl font-semibold transition",
  ghost: "inline-flex items-center justify-center text-cliq-navy-800 underline font-medium",
  onDark:
    "inline-flex items-center justify-center border-2 border-white/30 text-white px-6 py-3 rounded-xl font-semibold hover:border-white/50 transition",
  onBanner:
    "inline-flex items-center justify-center bg-white text-cliq-navy-900 font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition",
};

export default function Button({
  children,
  href,
  className,
  variant = "primary",
  full,
  onClick,
}: Props) {
  const classes = cn(styles[variant], full && "w-full", className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} onClick={onClick}>
      {children}
    </button>
  );
}
