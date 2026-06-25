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
        "inline-flex rounded-full bg-cliq-purple-soft px-4 py-2 text-sm font-semibold text-cliq-purple",
        className
      )}
    >
      {children}
    </span>
  );
}
