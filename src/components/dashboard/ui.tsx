"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import CircleLoader from "@/components/ui/CircleLoader";
import { fadeUp } from "@/lib/animations";
import { cn } from "@/lib/utils";

const sectionToneClass = {
  default: "bg-transparent",
  muted: "bg-slate-50/80",
  accent: "bg-cliq-purple-soft/20",
  warning: "bg-amber-50/50",
} as const;

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
    <motion.div initial="hidden" animate="visible" variants={fadeUp} className="space-y-0">
      <header className="border-b border-slate-200 pb-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Workspace</p>
            <h1 className="mt-1 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">{title}</h1>
            {subtitle ? <p className="mt-1 max-w-2xl text-sm leading-relaxed text-slate-600">{subtitle}</p> : null}
          </div>
          {right ? <div className="shrink-0">{right}</div> : null}
        </div>
      </header>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ delay: 0.06 }}
        className="divide-y divide-slate-200"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export function PageSection({
  children,
  title,
  description,
  tone = "default",
  bleed = false,
  className,
}: {
  children: React.ReactNode;
  title?: string;
  description?: string;
  tone?: keyof typeof sectionToneClass;
  bleed?: boolean;
  className?: string;
}) {
  return (
    <section
      className={cn(
        sectionToneClass[tone],
        bleed && "-mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-10 lg:px-10",
        "py-8 lg:py-10",
        className,
      )}
    >
      {title ? (
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-lg font-black text-slate-900">{title}</h2>
            {description ? <p className="mt-1 text-sm text-slate-600">{description}</p> : null}
          </div>
        </div>
      ) : null}
      {children}
    </section>
  );
}

export function TwoColumn({
  left,
  right,
  className,
}: {
  left: React.ReactNode;
  right: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid gap-8 lg:grid-cols-2 lg:gap-0 lg:divide-x lg:divide-slate-200",
        className,
      )}
    >
      <div className="lg:pr-10">{left}</div>
      <div className="lg:pl-10">{right}</div>
    </div>
  );
}

export function StatRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid divide-y divide-slate-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
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
    <div className="px-0 py-4 sm:px-6 sm:py-5 first:sm:pl-0 last:sm:pr-0">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-black text-slate-900">{value}</p>
      {hint ? <p className="mt-1 text-xs text-slate-600">{hint}</p> : null}
    </div>
  );
}

/** Minimal surface for wizards and forms that still need a bounded panel */
export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("border border-slate-200/90 bg-white/60 p-5 sm:p-6", className)}>
      {children}
    </div>
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

export function ChecklistRow({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 border-b border-slate-200 py-4 last:border-b-0 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-semibold text-slate-900">{title}</p>
        <p className="mt-1 text-sm text-slate-600">{description}</p>
      </div>
      <div className="shrink-0">{action}</div>
    </div>
  );
}

export function ListRow({
  href,
  children,
  className,
}: {
  href?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const classes = cn(
    "block border-b border-slate-200 py-4 transition last:border-b-0 hover:bg-slate-50/50",
    className,
  );
  if (href) {
    return (
      <Link href={href} className={cn(classes, "group")}>
        {children}
      </Link>
    );
  }
  return <div className={classes}>{children}</div>;
}

type ActionVariant = "primary" | "secondary" | "danger" | "amber";

const actionStyles: Record<ActionVariant, string> = {
  primary:
    "bg-gradient-to-r from-cliq-navy-900 via-cliq-purple to-cliq-purple-light !text-white shadow-[0_12px_32px_rgba(31,58,95,0.18)] hover:shadow-[0_16px_40px_rgba(31,58,95,0.24)]",
  secondary:
    "border border-slate-200 bg-white !text-slate-900 hover:border-slate-300 hover:bg-slate-50",
  danger: "bg-rose-600 !text-white hover:bg-rose-700",
  amber: "bg-amber-500 !text-white hover:bg-amber-600",
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
      className={cn(
        "inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-[15px] font-semibold leading-none !no-underline transition duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cliq-purple/25 active:translate-y-0 active:scale-[0.98]",
        actionStyles[variant],
        className,
      )}
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
      className={cn(
        "inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-[15px] font-semibold leading-none transition duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cliq-purple/25 active:translate-y-0 active:scale-[0.98] disabled:translate-y-0 disabled:opacity-50",
        actionStyles[variant],
        className,
      )}
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
