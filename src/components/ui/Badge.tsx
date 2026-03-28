/*
  ┌─────────────────────────────────────────────────────────┐
  │  CEDARCE COLOUR REFERENCE — paste in every component   │
  └─────────────────────────────────────────────────────────┘
*/
import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "popular" | "gold" | "teal";

export default function Badge({
  children,
  variant = "default",
  className,
}: {
  children: string;
  variant?: BadgeVariant;
  className?: string;
}) {
  const styles: Record<BadgeVariant, string> = {
    default: "bg-cliq-purple-soft text-cliq-purple",
    popular: "bg-g-brand text-white",
    gold: "bg-cliq-gold text-white",
    teal: "bg-cliq-teal text-cliq-navy-900",
  };

  return (
    <span
      className={cn(
        "inline-flex rounded-full px-3 py-1 text-xs font-semibold",
        styles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
