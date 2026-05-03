/*
  ┌─────────────────────────────────────────────────────────┐
  │  CEDARCE COLOUR REFERENCE - paste in every component   │
  └─────────────────────────────────────────────────────────┘
*/
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
        "inline-flex rounded-full px-4 py-2 text-sm font-semibold",
        className
      )}
    >
      {children}
    </span>
  );
}
