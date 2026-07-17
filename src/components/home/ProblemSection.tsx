"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, Minus } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import Button from "@/components/ui/Button";
import { OUTCOME_IMAGES } from "@/lib/marketing-images";

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
  {
    id: "presence",
    title: "Online presence",
    before: "Nothing customers can verify online",
    after: "A professional website working 24/7",
  },
  {
    id: "ops",
    title: "Operations",
    before: "Manual order tracking and follow-ups",
    after: "Automated order, delivery, and follow-up updates",
  },
];

export default function ProblemSection() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const current = pairs[active]!;

  return (
    <section className="relative overflow-hidden bg-black py-20 lg:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:22px_22px]"
      />
      <div className="relative mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <div>
            <SectionLabel>Without vs with us</SectionLabel>
            <h2 className="mt-5 max-w-md font-display text-3xl leading-tight text-cedar-ivory sm:text-4xl lg:text-5xl">
              Manual is how you started. Automated is how you scale.
            </h2>
            <p className="mt-4 max-w-md text-lg text-cedar-mist">
              Stop leaving money on the table because your business looks informal. Tap a stack item to see
              what changes.
            </p>
            <div className="mt-8 grid max-w-md grid-cols-3 gap-2">
              {OUTCOME_IMAGES.map((image, index) => (
                <div
                  key={image.src}
                  className={`relative h-28 overflow-hidden border border-white/10 sm:h-36 ${
                    index === 1 ? "mt-5" : ""
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1024px) 140px, 30vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
                </div>
              ))}
            </div>
            <Button href="/contact" variant="outlineLight" className="mt-8">
              Start your setup
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Interactive content stack — Enyata process pattern */}
          <div className="space-y-3">
            {pairs.map((pair, index) => {
              const open = active === index;
              return (
                <button
                  key={pair.id}
                  type="button"
                  onClick={() => setActive(index)}
                  aria-expanded={open}
                  className={`w-full rounded-3xl border px-5 py-4 text-left transition sm:px-6 sm:py-5 ${
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
            <p className="pt-2 text-sm text-cedar-mist lg:hidden" aria-live="polite">
              Showing: {current.title}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
