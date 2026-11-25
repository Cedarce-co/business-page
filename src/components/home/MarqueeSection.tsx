"use client";

import Marquee from "@/components/motion/Marquee";

const words = ["Websites", "Business email", "Payments", "Invoices", "Customer messages", "Social media", "Connected tools"];

function Star() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="mx-6 h-8 w-8 shrink-0 text-brand-300 sm:mx-10 sm:h-12 sm:w-12">
      <path fill="currentColor" d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0Z" />
    </svg>
  );
}

/** Oversized service names that drift sideways and speed up with scroll. */
export default function MarqueeSection() {
  return (
    <section aria-label="What we set up" className="relative overflow-hidden border-y border-line bg-brand-50/50 py-8 sm:py-12">
      <Marquee baseVelocity={-1.5} className="mask-fade-x">
        {words.map((w, i) => (
          <span key={w} className="flex items-center">
            <span
              className={
                i % 2 === 0
                  ? "font-display text-5xl font-semibold tracking-[-0.04em] text-brand-900 sm:text-7xl lg:text-8xl"
                  : "font-display text-5xl font-semibold tracking-[-0.04em] text-gradient sm:text-7xl lg:text-8xl"
              }
            >
              {w}
            </span>
            <Star />
          </span>
        ))}
      </Marquee>
    </section>
  );
}
