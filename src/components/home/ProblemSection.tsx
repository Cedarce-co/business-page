"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Minus } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import Button from "@/components/ui/Button";

const pairs = [
  {
    id: "receipts",
    title: "Receipts & invoices",
    before: "Manually typing receipts and chasing paper trails",
    after: "Branded receipts and invoices sent automatically",
  },
  {
    id: "payments",
    title: "Getting paid",
    before: "Chasing payments by hand over WhatsApp",
    after: "Online payments confirmed in real time",
  },
  {
    id: "email",
    title: "Business identity",
    before: "Personal Gmail for serious business",
    after: "hello@yourbusiness.com — credibility in every inbox",
  },
  {
    id: "reach",
    title: "Customer reach",
    before: "Notifying customers one by one",
    after: "Bulk messaging that reaches everyone at once",
  },
];

export default function ProblemSection() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const current = pairs[active]!;

  return (
    <section className="relative overflow-hidden bg-black py-14 lg:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:22px_22px]"
      />
      <div className="relative mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-8 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <div>
            <SectionLabel>Without vs with us</SectionLabel>
            <h2 className="mt-4 max-w-md font-display text-[1.85rem] leading-tight text-cedar-ivory sm:mt-5 sm:text-4xl lg:text-5xl">
              Manual is how you started. Automated is how you scale.
            </h2>
            <p className="mt-3 max-w-md text-sm text-cedar-mist sm:mt-4 sm:text-lg">
              See what changes when the manual work becomes a connected system.
            </p>
            <Button href="/contact" variant="outlineLight" className="mt-8 hidden lg:inline-flex">
              Start your setup
            </Button>
          </div>

          {/* Mobile: chip rail + one comparison card */}
          <div className="lg:hidden">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {pairs.map((pair, index) => {
                const open = active === index;
                return (
                  <button
                    key={pair.id}
                    type="button"
                    onClick={() => setActive(index)}
                    className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                      open
                        ? "border-cedar-accent bg-cedar-accent text-black"
                        : "border-white/15 text-cedar-mist"
                    }`}
                  >
                    {pair.title}
                  </button>
                );
              })}
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={reduced ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: 0.22 }}
                className="mt-4 rounded-2xl border border-cedar-accent/35 bg-cedar-accentSoft px-4 py-4"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cedar-accent">
                  {String(active + 1).padStart(2, "0")} · {current.title}
                </p>
                <div className="mt-3 space-y-3">
                  <p className="flex gap-2 text-sm text-white/50">
                    <Minus className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                    {current.before}
                  </p>
                  <p className="flex gap-2 text-sm font-medium text-cedar-ivory">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-cedar-accent" aria-hidden />
                    {current.after}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Desktop: interactive accordion stack */}
          <div className="hidden space-y-3 lg:block">
            {pairs.map((pair, index) => {
              const open = active === index;
              return (
                <button
                  key={pair.id}
                  type="button"
                  onClick={() => setActive(index)}
                  aria-expanded={open}
                  className={`w-full rounded-3xl border px-6 py-5 text-left transition ${
                    open
                      ? "border-cedar-accent/35 bg-cedar-accentSoft"
                      : "border-white/10 bg-transparent hover:border-white/20 hover:bg-white/[0.03]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-sm font-bold ${
                        open ? "bg-cedar-accent text-black" : "bg-white/5 text-cedar-mist"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className={`text-lg font-semibold ${open ? "text-cedar-ivory" : "text-cedar-mist"}`}>
                      {pair.title}
                    </h3>
                  </div>
                  <AnimatePresence initial={false}>
                    {open ? (
                      <motion.div
                        initial={reduced ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={reduced ? undefined : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.28 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 space-y-3 border-t border-white/10 pt-4">
                          <p className="flex gap-2 text-sm text-white/50">
                            <Minus className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                            {pair.before}
                          </p>
                          <p className="flex gap-2 text-sm font-medium text-cedar-ivory">
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-cedar-accent" aria-hidden />
                            {pair.after}
                          </p>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
