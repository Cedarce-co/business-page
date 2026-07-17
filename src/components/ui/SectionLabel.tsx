import { cn } from "@/lib/utils";

export default function SectionLabel({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex text-[11px] font-semibold uppercase tracking-[0.28em] text-cedar-accent",
        className
      )}
    >
      {children}
    </span>
  );
}
