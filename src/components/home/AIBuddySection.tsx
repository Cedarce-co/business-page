/*
  ┌─────────────────────────────────────────────────────────┐
  │  CEDARCE COLOUR REFERENCE — paste in every component   │
  └─────────────────────────────────────────────────────────┘
*/
"use client";

import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import Button from "@/components/ui/Button";
import ChatBubble from "@/components/ui/ChatBubble";
import { chatBubble, staggerSlow, viewport } from "@/lib/animations";

export default function AIBuddySection() {
  return (
    <section className="bg-cliq-white py-20 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <SectionLabel className="bg-cliq-gray-100 text-cliq-text-heading border border-cliq-gray-200">
            Your 24/7 Buddy
          </SectionLabel>
          <h2 className="mt-5 text-4xl font-black text-cliq-text-heading lg:text-5xl">
            Meet your AI business buddy.
            <br />
            Ask anything. Get answers.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-cliq-text-body">
            Your buddy is always around to answer practical questions about your business setup.
          </p>
        </div>
        <div className="mx-auto mt-12 max-w-md overflow-hidden rounded-3xl border border-cliq-navy-600 bg-cliq-navy-700 shadow-purple">
          <div className="flex items-center px-5 py-4 bg-cliq-navy-800 rounded-t-3xl">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-cliq-teal" />
            <span className="ml-2 text-sm font-semibold text-white">Cedarce AI Buddy</span>
            <span className="ml-1 text-xs text-cliq-navy-300">· Online now</span>
          </div>
          <motion.div
            variants={staggerSlow}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="space-y-3 p-5"
          >
            {[
              { side: "user", text: "How do I start accepting payments online for my food store?" },
              {
                side: "buddy",
                text: "Great question! Your buddy can set up card, transfer, and USSD in 48 hours and connect it to your invoicing.",
              },
              { side: "user", text: "What does a professional business email cost?" },
              {
                side: "buddy",
                text: "A setup like hello@yourstore.ng starts at ₦25,000. Want your free consultation? 📧",
              },
            ].map((item, i) => (
              <motion.div variants={chatBubble} key={i}>
                <ChatBubble side={item.side as "user" | "buddy"} text={item.text} />
              </motion.div>
            ))}
            <div className="inline-flex gap-1 rounded-full bg-cliq-navy-600 px-3 py-2">
              <span className="h-2 w-2 animate-bounce rounded-full bg-white/60 [animation-delay:-0.2s]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-white/60 [animation-delay:-0.1s]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-white/60" />
            </div>
          </motion.div>
        </div>
        <div className="mt-8 text-center">
          <Button
            onClick={() => {
              if (typeof window !== "undefined") {
                window.dispatchEvent(new Event("open-ai-chat"));
              }
            }}
          >
            Open Cedarce AI →
          </Button>
        </div>
      </div>
    </section>
  );
}
