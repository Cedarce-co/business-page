"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { FAQS } from "@/lib/constants";
import { EASE_SMOOTH } from "@/lib/animations";
import { cn } from "@/lib/utils";

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {FAQS.map((item, index) => {
        const open = openIndex === index;
        return (
          <article
            key={item.q}
            className={cn(
              "overflow-hidden rounded-2xl border bg-white shadow-[0_8px_24px_rgba(10,10,20,0.04)] transition duration-200",
              open ? "border-cliq-purple/25 shadow-card" : "border-cliq-gray-200 hover:border-cliq-navy-800/15",
            )}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(open ? null : index)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              aria-expanded={open}
            >
              <span className="font-semibold text-cliq-text-heading">{item.q}</span>
              <ChevronDown
                className={cn("h-5 w-5 shrink-0 text-cliq-text-muted transition duration-200", open && "rotate-180 text-cliq-purple")}
                aria-hidden
              />
            </button>
            <AnimatePresence initial={false}>
              {open ? (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: EASE_SMOOTH }}
                >
                  <p className="border-t border-cliq-gray-100 px-5 pb-5 pt-3 text-sm leading-relaxed text-cliq-text-body">
                    {item.a}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </article>
        );
      })}
    </div>
  );
}
