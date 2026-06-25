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
  type?: "button" | "submit";
};

const styles: Record<Variant, string> = {
  primary:
    "inline-flex items-center justify-center rounded-xl border border-cliq-gray-300 bg-white px-6 py-3 font-semibold text-cliq-navy-900 shadow-card transition duration-200 hover:-translate-y-0.5 hover:bg-cliq-gray-100 hover:shadow-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cliq-navy-800/25 active:translate-y-0 active:scale-[0.98]",
  secondary:
    "inline-flex items-center justify-center rounded-xl border border-cliq-navy-100 bg-white/90 px-6 py-3 font-semibold text-cliq-navy-800 shadow-[0_10px_30px_rgba(10,10,20,0.08)] transition duration-200 hover:-translate-y-0.5 hover:border-cliq-navy-200 hover:bg-cliq-purple-soft hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cliq-navy-800/20 active:translate-y-0 active:scale-[0.98]",
  teal:
    "inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-cliq-navy-900 via-cliq-purple to-cliq-purple-light px-6 py-3 font-bold text-white shadow-[0_18px_45px_rgba(31,58,95,0.24)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_22px_55px_rgba(31,58,95,0.30)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cliq-purple/30 active:translate-y-0 active:scale-[0.98]",
  dark:
    "inline-flex items-center justify-center rounded-xl bg-cliq-navy-800 px-6 py-3 font-semibold text-white shadow-[0_16px_40px_rgba(10,10,20,0.22)] transition duration-200 hover:-translate-y-0.5 hover:bg-cliq-navy-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cliq-navy-800/30 active:translate-y-0 active:scale-[0.98]",
  ghost:
    "inline-flex items-center justify-center font-medium text-cliq-navy-800 underline decoration-cliq-navy-800/25 underline-offset-4 transition hover:text-cliq-purple hover:decoration-cliq-purple/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cliq-navy-800/20",
  onDark:
    "inline-flex items-center justify-center rounded-xl border border-white/30 px-6 py-3 font-semibold text-white shadow-[0_14px_36px_rgba(0,0,0,0.18)] transition duration-200 hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 active:translate-y-0",
  onBanner:
    "inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 font-bold text-cliq-navy-900 shadow-lg transition duration-200 hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 active:translate-y-0",
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
  const classes = cn(styles[variant], full && "w-full", className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick}>
      {children}
    </button>
  );
}
