"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import { FAQS } from "@/lib/constants";
import { EASE_SMOOTH } from "@/lib/animations";
import { cn } from "@/lib/utils";

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reduced = useReducedMotion();

  return (
    <div className="space-y-3">
      {FAQS.map((item, index) => {
        const open = openIndex === index;
        return (
          <motion.article
            key={item.q}
            layout={!reduced}
            className={cn(
              "overflow-hidden rounded-3xl border transition-colors duration-300",
              open ? "border-brand-200 bg-brand-50/60 shadow-soft" : "border-line bg-white hover:border-brand-200",
            )}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(open ? null : index)}
              className="flex min-h-14 w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
              aria-expanded={open}
            >
              <span className="text-[15px] font-semibold text-brand-950 sm:text-base">{item.q}</span>
              <span
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition duration-300",
                  open ? "rotate-45 bg-g-button text-white shadow-glow-sm" : "bg-brand-50 text-brand-600",
                )}
              >
                <Plus className="h-4 w-4" aria-hidden />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {open ? (
                <motion.div
                  initial={reduced ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduced ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: EASE_SMOOTH }}
                >
                  <p className="px-5 pb-6 text-[15px] leading-relaxed text-slate-600 sm:px-6">{item.a}</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.article>
        );
      })}
    </div>
  );
}
