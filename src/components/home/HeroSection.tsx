"use client";

import { motion } from "framer-motion";
import FloatingCard from "@/components/ui/FloatingCard";
import Button from "@/components/ui/Button";
import { stagger, wordReveal } from "@/lib/animations";

const words = ["Findable", "Credible", "Paid faster"];

const notifications = [
  { icon: "✅", title: "Invoice #0042 sent to Amaka Foods", meta: "Just now" },
  { icon: "💰", title: "Payment received", meta: "2 mins ago" },
  { icon: "📧", title: "Business email configured", meta: "hello@amakas.ng" },
  { icon: "📱", title: "WhatsApp follow-up sent", meta: "Automated" },
  { icon: "🌐", title: "Website live at amakas.ng", meta: "3 set up today" },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-cliq-white pt-44 lg:pt-32">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 80% 50%, rgba(15,23,42,0.07) 0%, transparent 60%)",
        }}
      />
      <div className="absolute inset-0 opacity-[0.03] [background-image:radial-gradient(#111122_1px,transparent_1px)] [background-size:18px_18px]" />
      <div className="relative mx-auto grid min-h-screen w-full max-w-[1440px] items-center gap-12 px-4 py-10 sm:w-[80%] sm:px-0 lg:grid-cols-2">
        <div className="flex flex-col items-start text-left">
          <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-cliq-gray-300 bg-white px-4 py-2 text-left text-sm font-semibold text-cliq-text-body shadow-card">
            Your hustle is real. Your digital presence should match.
          </span>

          <motion.h1
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="mt-6 text-5xl font-black leading-tight text-cliq-text-heading lg:text-7xl"
          >
            {words.map((word, idx) => (
              <motion.span key={word} variants={wordReveal} className="block text-cliq-text-heading">
                {idx === words.length - 1 ? <span className="text-gradient">{word}</span> : word}
              </motion.span>
            ))}
          </motion.h1>

          <p className="mt-6 max-w-lg text-lg text-cliq-text-body">
            Customers search for you before they buy from you.{" "}
            <strong className="font-semibold text-cliq-text-heading">what do they find?</strong> We set up your website,
            payments, invoicing, business email, and automation so you look credible and get paid faster.
          </p>
          <div className="mt-8 flex w-full max-w-lg flex-row flex-nowrap items-stretch justify-start gap-2 sm:gap-3">
            <Button
              href="/signup"
              variant="dark"
              className="min-w-0 flex-1 rounded-xl px-3 py-3 text-center text-xs font-bold leading-tight sm:px-6 sm:text-base"
            >
              Get Started
            </Button>
            <Button
              href="/contact"
              variant="secondary"
              className="min-w-0 flex-1 rounded-xl px-3 py-3 text-center text-xs font-bold leading-tight sm:px-6 sm:text-base"
            >
              Book your free consultation
            </Button>
          </div>
          <div className="mt-8">
          <p className="mt-6 text-sm text-cliq-text-muted">
              ✦ Trusted by food stores, pharmacies, churches, startups &amp; more businesses.
            </p>
          </div>
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
