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
  variant?: "default" | "onDark" | "auth";
  className?: string;
}) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className={cn(
        "group inline-flex items-center gap-2 rounded-full text-sm font-semibold transition",
        variant === "auth"
          ? "text-cliq-purple hover:bg-cliq-purple-soft hover:text-cliq-purple-dark"
          : "border border-line bg-white text-brand-800 shadow-soft hover:border-brand-200 hover:bg-brand-50",
        variant === "auth"
          ? arrow === "left"
            ? "pr-2 pl-1 py-1.5"
            : "flex-row-reverse pl-2 pr-1 py-1.5"
          : arrow === "left"
            ? "py-1.5 pl-2.5 pr-3.5"
            : "flex-row-reverse py-1.5 pl-3.5 pr-2.5",
        className
      )}
    >
      {arrow === "left" ? <ArrowLeft className="h-4 w-4 shrink-0 transition group-hover:-translate-x-0.5" aria-hidden /> : null}
      <span>{label}</span>
      {arrow === "right" ? <ArrowRight className="h-4 w-4 shrink-0" aria-hidden /> : null}
    </button>
  );
}
