"use client";

import { useState } from "react";
import { resolveValue, type Toast } from "react-hot-toast";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";

const TYPE_META = {
  success: {
    label: "Success",
    progress: "#10b981",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    Icon: CheckCircle2,
  },
  error: {
    label: "Error",
    progress: "#f43f5e",
    iconBg: "bg-rose-50",
    iconColor: "text-rose-600",
    Icon: AlertCircle,
  },
  loading: {
    label: "Working",
    progress: "#0f172a",
    iconBg: "bg-slate-100",
    iconColor: "text-slate-700",
    Icon: Loader2,
  },
  blank: {
    label: "Notice",
    progress: "#10b981",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    Icon: CheckCircle2,
  },
  custom: {
    label: "Notice",
    progress: "#10b981",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    Icon: CheckCircle2,
  },
} as const;

export default function ToastNotification({ toast: t }: { toast: Toast }) {
  const [paused, setPaused] = useState(false);
  const meta = TYPE_META[t.type] ?? TYPE_META.blank;
  const { Icon } = meta;
  const message = resolveValue(t.message, t);
  const duration = t.duration ?? 4000;
  const showProgress = t.type !== "loading" && duration !== Infinity;

  return (
    <div
      role={t.ariaProps.role}
      aria-live={t.ariaProps["aria-live"]}
      className={`pointer-events-auto w-[min(100vw-2rem,24rem)] overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.14)] transition-all duration-300 ${
        t.visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
      }`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="flex items-start gap-3 px-4 py-3.5">
        <div
          className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${meta.iconBg} ${meta.iconColor}`}
        >
          <Icon className={`h-5 w-5 ${t.type === "loading" ? "animate-spin" : ""}`} aria-hidden />
        </div>
        <div className="min-w-0 flex-1 pt-0.5">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">{meta.label}</p>
          <div className="mt-1 text-sm font-medium leading-snug text-slate-900 [&_a]:font-semibold [&_a]:text-slate-900 [&_a]:underline">
            {message}
          </div>
        </div>
      </div>

      {showProgress ? (
        <div className="h-1 w-full bg-slate-100">
          <div
            className="toast-progress-bar h-full origin-left"
            style={{
              backgroundColor: meta.progress,
              animationDuration: `${duration}ms`,
              animationPlayState: paused ? "paused" : "running",
            }}
          />
        </div>
      ) : null}
    </div>
  );
}
