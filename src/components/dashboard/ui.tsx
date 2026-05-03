"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import CircleLoader from "@/components/ui/CircleLoader";

export function Page({
  title,
  subtitle,
  children,
  right,
}: {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28 }}
      className="space-y-6"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">{title}</h1>
          {subtitle ? <p className="mt-1 max-w-2xl text-sm text-slate-600">{subtitle}</p> : null}
        </div>
        {right ? <div className="sm:pb-1">{right}</div> : null}
      </div>
      {children}
    </motion.div>
  );
}

export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-[0_1px_0_rgba(15,23,42,0.06)] backdrop-blur ${className}`}>
      {children}
    </div>
  );
}

export function Stat({
  label,
  value,
  hint,
}: {
  label: string;
  value: React.ReactNode;
  hint?: string;
}) {
  return (
    <Card className="p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-black text-slate-900">{value}</p>
      {hint ? <p className="mt-1 text-xs text-slate-600">{hint}</p> : null}
    </Card>
  );
}

export function Badge({ children, tone = "slate" }: { children: React.ReactNode; tone?: "slate" | "amber" | "emerald" | "rose" }) {
  const map = {
    slate: "bg-slate-100 text-slate-700 border-slate-200",
    amber: "bg-amber-50 text-amber-800 border-amber-200",
    emerald: "bg-emerald-50 text-emerald-800 border-emerald-200",
    rose: "bg-rose-50 text-rose-800 border-rose-200",
  } as const;
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${map[tone]}`}>
      {children}
    </span>
  );
}

type ActionVariant = "primary" | "secondary" | "danger" | "amber";

const actionStyles: Record<ActionVariant, string> = {
  primary:
    "bg-cliq-navy-900 !text-white hover:bg-cliq-navy-800 shadow-[0_14px_40px_rgba(15,23,42,0.18)]",
  secondary:
    "bg-white !text-slate-900 border border-slate-200 hover:bg-slate-50 shadow-[0_10px_30px_rgba(15,23,42,0.10)]",
  danger:
    "bg-rose-600 !text-white hover:bg-rose-700 shadow-[0_14px_40px_rgba(225,29,72,0.18)]",
  amber:
    "bg-amber-500 !text-white hover:bg-amber-600 shadow-[0_14px_40px_rgba(245,158,11,0.20)]",
};

export function ActionLink({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: ActionVariant;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-[15px] font-semibold leading-none !no-underline ${actionStyles[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}

export function ActionButton({
  children,
  variant = "primary",
  disabled,
  loading,
  onClick,
  className = "",
  type = "button",
}: {
  children: React.ReactNode;
  variant?: ActionVariant;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-[15px] font-semibold leading-none ${actionStyles[variant]} disabled:opacity-50 ${className}`}
    >
      {loading ? (
        <span className="inline-flex items-center gap-2">
          <CircleLoader size={18} className="opacity-90" />
          <span className="opacity-90">{children}</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
}
