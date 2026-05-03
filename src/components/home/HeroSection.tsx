/*
  ┌─────────────────────────────────────────────────────────┐
  │  CEDARCE COLOUR REFERENCE - paste in every component   │
  └─────────────────────────────────────────────────────────┘
*/
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
    <section className="relative overflow-hidden bg-cliq-white pt-28 lg:pt-32">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 80% 50%, rgba(15,23,42,0.07) 0%, transparent 60%)",
        }}
      />
      <div className="absolute inset-0 opacity-[0.03] [background-image:radial-gradient(#111122_1px,transparent_1px)] [background-size:18px_18px]" />
      <div className="relative mx-auto grid min-h-screen w-[80%] max-w-[1440px] items-center gap-12 py-10 lg:grid-cols-2">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-cliq-gray-300 bg-white px-4 py-2 text-sm font-semibold text-cliq-text-body shadow-card">
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

          <p className="mt-6 max-w-lg text-lg text-cliq-text-body lg:mx-0">
            Customers search for you before they buy from you.{" "}
            <strong className="font-semibold text-cliq-text-heading">what do they find?</strong> We set up your website,
            payments, invoicing, business email, and automation so you look credible and get paid faster.
          </p>
          {/* <p className="mt-3 max-w-lg text-sm font-medium leading-relaxed text-cliq-text-heading">
            From informal to professional in 48 hours. No stress. One team: we handle everything end to end.
          </p> */}
          <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
            <Button href="/signup" variant="dark" className="rounded-xl px-6 py-3 text-base font-bold">
              Get Started
            </Button>
            <Button href="/contact" variant="secondary" className="rounded-xl px-6 py-3 text-base font-bold">
              Book your free consultation
            </Button>
          </div>
          <p className="mt-6 text-sm text-cliq-text-muted lg:text-left">
            ✦ Trusted by food stores, pharmacies, churches, startups &amp; more across Nigeria
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
