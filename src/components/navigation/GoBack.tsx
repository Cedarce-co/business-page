"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function GoBack({
  label = "Go back",
  arrow = "left",
  variant = "default",
  className,
}: {
  label?: string;
  arrow?: "left" | "right";
  variant?: "default" | "onDark";
  className?: string;
}) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className={cn(
        "inline-flex items-center gap-2 rounded-lg text-sm font-semibold transition",
        variant === "onDark"
          ? "text-slate-200 hover:bg-white/10 hover:text-white"
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
        arrow === "left" ? "pr-2 pl-1 py-1.5" : "flex-row-reverse pl-2 pr-1 py-1.5",
        className
      )}
    >
      {arrow === "left" ? <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden /> : null}
      <span>{label}</span>
      {arrow === "right" ? <ArrowRight className="h-4 w-4 shrink-0" aria-hidden /> : null}
    </button>
  );
}
