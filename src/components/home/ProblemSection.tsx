"use client";

import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import SectionIntro from "@/components/ui/SectionIntro";
import { slideLeft, slideRight, viewport } from "@/lib/animations";

const before = [
  "Manually typing receipts",
  "Chasing payments by hand",
  "Personal email for business",
  "Notifying customers one by one",
  "No online presence customers can verify",
  "Manual order tracking",
  "Looking informal and unverified",
  "Losing clients to competitors who look more professional",
];
const after = [
  "Branded receipts sent automatically",
  "Online payments confirmed in real time",
  "hello@yourbusiness.com (credibility in every inbox)",
  "Bulk messaging reaching everyone at once",
  "A professional website working 24/7",
  "Automated order and delivery updates",
  "Looking credible, trusted, and established",
  "Winning clients with a presence that closes the sale",
];

export default function ProblemSection() {
  return (
    <section className="bg-cliq-white py-20 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <SectionIntro>
          <SectionLabel className="bg-cliq-purple-soft text-cliq-purple">Without vs with us</SectionLabel>
          <h2 className="mt-5 text-4xl font-black text-cliq-text-heading lg:text-5xl">
            Manual is how you started. Automated is how you scale.
          </h2>
          <p className="mt-4 text-lg text-cliq-text-body">
            Stop leaving money on the table because your business looks informal. Here&apos;s the gap, and exactly what
            changes when you go professional with us.
          </p>
        </SectionIntro>
        <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-[1fr_auto_1fr]">
          <motion.div
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="rounded-3xl border border-cliq-gray-200 bg-cliq-gray-100 p-8"
          >
            <p className="mb-5 text-xs font-semibold uppercase tracking-wide text-cliq-text-muted">
              Before
            </p>
            <ul className="space-y-3 text-cliq-text-body list-none">
              {before.map((item) => (
                <li key={item}>❌ {item}</li>
              ))}
            </ul>
          </motion.div>
          <div className="flex items-center justify-center text-center text-3xl font-black text-cliq-purple">
            One click →
          </div>
          <motion.div
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="animate-glow-pulse rounded-3xl border-2 border-cliq-purple bg-g-card p-8 shadow-purple"
          >
            <span className="rounded-full bg-g-brand px-3 py-1 text-xs text-white">
              With us
            </span>
            <ul className="mt-5 space-y-3 text-cliq-text-body list-none">
              {after.map((item) => (
                <li key={item}>✅ {item}</li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
