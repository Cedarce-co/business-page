/*
  ┌─────────────────────────────────────────────────────────┐
  │  CEDARCE COLOUR REFERENCE — paste in every component   │
  └─────────────────────────────────────────────────────────┘
*/
"use client";

import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import { slideLeft, slideRight, viewport } from "@/lib/animations";

const before = [
  "WhatsApp messages for all orders",
  "Cash only - no payment records",
  "No website or online presence",
  "Handwritten or no receipts",
  "No professional email address",
  "Manual follow-ups that never happen",
  "No way to message all customers at once",
];
const after = [
  "Professional landing page taking orders",
  "Online payments - card, transfer, USSD",
  "Automated branded invoices instantly",
  "Branded receipts emailed automatically",
  "hello@yourbusiness.ng professional email",
  "Automated WhatsApp and email follow-ups",
  "Bulk messaging reaching all customers",
];

export default function ProblemSection() {
  return (
    <section className="bg-cliq-white py-20 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <SectionLabel className="bg-cliq-purple-soft text-cliq-purple">The Problem</SectionLabel>
        <h2 className="mt-5 text-4xl font-black text-cliq-text-heading lg:text-5xl">
          Still running your business manually?
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-cliq-text-body">
          Every day your business looks informal you are losing customers to competitors who look
          professional. Here is the exact gap.
        </p>
        <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-[1fr_auto_1fr]">
          <motion.div
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="rounded-3xl border border-cliq-gray-200 bg-cliq-gray-100 p-8"
          >
            <p className="mb-5 text-xs font-semibold uppercase tracking-wide text-cliq-text-muted">
              Before Cedarce
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
              With Cedarce
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
