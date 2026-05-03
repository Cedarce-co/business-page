"use client";

export default function StatusBadge({
  tone,
  children,
}: {
  tone: "slate" | "amber" | "emerald" | "rose";
  children: React.ReactNode;
}) {
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

