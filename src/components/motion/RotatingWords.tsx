"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/** Cycles through words in place with a vertical blur-swap. */
export default function RotatingWords({
  words,
  interval = 2400,
  className,
  align = "start",
}: {
  words: string[];
  interval?: number;
  className?: string;
  /** Alignment inside the reserved width of the longest word. */
  align?: "start" | "center";
}) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced || words.length < 2) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => window.clearInterval(id);
  }, [interval, reduced, words.length]);

  const word = words[index] ?? "";

  return (
    <span className={cn(
        "relative inline-grid overflow-hidden align-bottom",
        align === "center" ? "justify-items-center text-center" : "justify-items-start text-left",
        className,
      )}>
      {/* Reserve width of the longest word so surrounding text doesn't jump */}
      <span aria-hidden className="invisible col-start-1 row-start-1 whitespace-nowrap">
        {words.reduce((a, b) => (b.length > a.length ? b : a), "")}
      </span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={word}
          className="col-start-1 row-start-1 whitespace-nowrap"
          initial={{ y: "100%", opacity: 0, filter: "blur(10px)" }}
          animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-100%", opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          {word}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
