"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * A tilted glass pill that springs in, then bobs gently.
 * Used to annotate big headlines ("Good" / "Better" style).
 */
export default function FloatingTag({
  children,
  rotate = -6,
  delay = 0.6,
  className,
  variant = "solid",
}: {
  children: ReactNode;
  rotate?: number;
  delay?: number;
  className?: string;
  variant?: "solid" | "glass" | "white";
}) {
  const reduced = useReducedMotion();

  const styles = {
    solid: "bg-g-button text-white shadow-glow btn-sheen border border-white/30",
    glass: "glass-blue text-white",
    white: "bg-white text-brand-700 shadow-lift border border-white",
  }[variant];

  return (
    <motion.span
      className={cn(
        "pointer-events-none inline-flex select-none items-center gap-1.5 whitespace-nowrap rounded-xl px-3.5 py-1.5 text-sm font-semibold sm:rounded-2xl sm:px-5 sm:py-2 sm:text-lg",
        styles,
        className,
      )}
      initial={reduced ? false : { opacity: 0, scale: 0.4, rotate: rotate * 3, y: 20 }}
      animate={
        reduced
          ? { rotate }
          : {
              opacity: 1,
              scale: 1,
              rotate,
              y: [0, -6, 0],
            }
      }
      transition={
        reduced
          ? undefined
          : {
              opacity: { delay, duration: 0.4 },
              scale: { delay, type: "spring", stiffness: 260, damping: 14 },
              rotate: { delay, type: "spring", stiffness: 200, damping: 12 },
              y: { delay: delay + 0.8, duration: 4, repeat: Infinity, ease: "easeInOut" },
            }
      }
    >
      {children}
    </motion.span>
  );
}
