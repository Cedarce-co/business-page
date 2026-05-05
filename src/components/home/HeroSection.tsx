"use client";

import { motion } from "framer-motion";
import FloatingCard from "@/components/ui/FloatingCard";
import Button from "@/components/ui/Button";
import { floatLoop, stagger, wordReveal } from "@/lib/animations";

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
          <motion.span
            initial={{ opacity: 0, y: 24 }}
            animate={floatLoop(0.2)}
            className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/20 bg-white/30 px-3 py-1 text-left text-[11px] font-semibold leading-tight text-cliq-text-body shadow-card shadow-slate-700/10 backdrop-blur-md backdrop-saturate-150 text-opacity-100 whitespace-nowrap sm:px-4 sm:py-2 sm:text-[13px] sm:whitespace-normal"
          >
            <span className="sm:hidden">Your hustle is real—match it online.</span>
            <span className="hidden sm:inline">
              Your hustle is real. Your digital presence should match.
            </span>
          </motion.span>

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
          <div className="mt-8 flex flex-wrap items-center gap-2">
            <Button
              href="/signup"
              variant="dark"
              className="min-w-[140px] rounded-xl px-4 py-3 text-center text-xs font-bold leading-tight sm:px-5 sm:text-sm"
            >
              Get Started
            </Button>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-cliq-text-body sm:text-sm">
              or <span aria-hidden="true">→</span>
            </span>
            <Button
              href="/contact"
              variant="ghost"
              className="min-w-[180px] rounded-xl px-0 py-3 text-left text-xs font-semibold leading-tight text-cliq-navy-900 underline underline-offset-4 decoration-cliq-navy-900 transition hover:bg-transparent hover:text-cliq-teal sm:text-sm"
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
