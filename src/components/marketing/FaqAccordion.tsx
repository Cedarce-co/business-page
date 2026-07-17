"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { FAQS } from "@/lib/constants";
import { EASE_SMOOTH } from "@/lib/animations";
import { cn } from "@/lib/utils";

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reduced = useReducedMotion();

  return (
    <div className="divide-y divide-white/10 border-y border-white/10">
      {FAQS.map((item, index) => {
        const open = openIndex === index;
        return (
          <article key={item.q} className="bg-black">
            <button
              type="button"
              onClick={() => setOpenIndex(open ? null : index)}
              className="flex min-h-14 w-full items-center justify-between gap-4 py-5 text-left"
              aria-expanded={open}
            >
              <span className="font-semibold text-cedar-ivory">{item.q}</span>
              <ChevronDown
                className={cn(
                  "h-5 w-5 shrink-0 text-cedar-mist transition duration-200",
                  open && "rotate-180 text-cedar-accent"
                )}
                aria-hidden
              />
            </button>
            <AnimatePresence initial={false}>
              {open ? (
                <motion.div
                  initial={reduced ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduced ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: EASE_SMOOTH }}
                >
                  <p className="pb-5 text-sm leading-relaxed text-cedar-mist">{item.a}</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </article>
        );
      })}
    </div>
  );
}
