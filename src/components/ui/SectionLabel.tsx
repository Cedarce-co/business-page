import { cn } from "@/lib/utils";

export default function SectionLabel({
  children,
  className,
  tone = "light",
}: {
  children: string;
  className?: string;
  /** "light" for white sections, "onBlue" for blue panels */
  tone?: "light" | "onBlue";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold tracking-wide",
        tone === "light"
          ? "border border-brand-100 bg-brand-50 text-brand-700"
          : "glass-blue text-white",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn("h-1.5 w-1.5 rounded-full", tone === "light" ? "bg-brand-500" : "bg-white")}
      />
      {children}
    </span>
  );
}
