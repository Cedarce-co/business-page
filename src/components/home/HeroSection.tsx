/*
  ┌─────────────────────────────────────────────────────────┐
  │  CEDARCE COLOUR REFERENCE — paste in every component   │
  └─────────────────────────────────────────────────────────┘
*/
"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import FloatingCard from "@/components/ui/FloatingCard";
import { stagger, wordReveal } from "@/lib/animations";

const words = ["Cedar.", "Commerce.", "Professional."];

const notifications = [
  { icon: "✅", title: "Invoice #0042 sent to Amaka Foods", meta: "Just now" },
  { icon: "💰", title: "Payment received ₦45,000", meta: "2 mins ago" },
  { icon: "📧", title: "Business email configured", meta: "hello@amakas.ng" },
  { icon: "📱", title: "WhatsApp follow-up sent", meta: "Automated" },
  { icon: "🌐", title: "Website live at amakas.ng", meta: "3 set up today" },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-cliq-white pt-28 lg:pt-32">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 80% 50%, rgba(15,23,42,0.07) 0%, transparent 60%)",
        }}
      />
      <div className="absolute inset-0 opacity-[0.03] [background-image:radial-gradient(#111122_1px,transparent_1px)] [background-size:18px_18px]" />
      <div className="relative mx-auto grid min-h-screen max-w-[1200px] items-center gap-12 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-cliq-gray-300 bg-white px-4 py-2 text-sm font-semibold text-cliq-text-body shadow-card">
            Digital business
          </span>

          <motion.h1
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="mt-6 text-5xl font-black leading-tight text-cliq-text-heading lg:text-7xl"
          >
            {words.map((word) => (
              <motion.span key={word} variants={wordReveal} className="block text-cliq-text-heading">
                {word === "Professional." ? <span className="text-gradient">{word}</span> : word}
              </motion.span>
            ))}
          </motion.h1>

          <p className="mt-6 max-w-lg text-lg text-cliq-text-body">
            We set up your website, payments, invoicing, emails, and automation so your business
            operates like the big players.
          </p>
          <p className="mt-3 max-w-lg text-sm font-medium text-cliq-text-heading">
            From informal to professional — we make your business go professional.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/contact">Go Pro</Button>
            <Button href="/#how-it-works" variant="onDark">
              See how it works
            </Button>
          </div>
          <p className="mt-6 text-sm text-cliq-text-muted">
            ✦ Trusted by growing businesses going professional
          </p>
        </div>
        <div className="space-y-4">
          {notifications.map((card, idx) => (
            <FloatingCard key={card.title} {...card} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
