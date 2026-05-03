"use client";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function Skeleton({
  className = "",
}: {
  className?: string;
}) {
  return <div className={`animate-pulse rounded-xl bg-slate-200/70 ${className}`} />;
}

export function SkeletonGrid({
  columns = 3,
  rows = 3,
  itemClassName = "h-24",
  className = "",
}: {
  columns?: number;
  rows?: number;
  itemClassName?: string;
  className?: string;
}) {
  const cols = clamp(columns, 1, 6);
  const items = Array.from({ length: clamp(rows, 1, 12) * cols });

  return (
    <div
      className={`grid gap-4 ${className}`}
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {items.map((_, i) => (
        <Skeleton key={i} className={itemClassName} />
      ))}
    </div>
  );
}

