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
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <SectionLabel className="border border-cliq-gray-200 bg-cliq-gray-100 text-cliq-text-heading">
              Live chat
            </SectionLabel>
            <h2 className="mt-5 text-4xl font-black leading-tight text-cliq-text-heading md:max-w-[50%] lg:max-w-none lg:text-5xl">
              Questions before you commit?
              <br />
              Get answers.
            </h2>
            <p className="mt-4 max-w-lg text-lg leading-relaxed text-cliq-text-body">
              Websites, payments, invoicing, email, automation: ask what it costs, how long it takes, and what you need first. We respond fast.
            </p>
            <div className="mt-8">
              <Button
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.dispatchEvent(new Event("open-ai-chat"));
                  }
                }}
              >
                Talk to us: open chat →
              </Button>
            </div>
          </div>

          <div className="mx-auto w-full max-w-md lg:mx-0 lg:max-w-lg lg:justify-self-end">
            <div className="overflow-hidden rounded-3xl border border-cliq-navy-600 bg-cliq-navy-700 shadow-purple">
              <div className="flex items-center rounded-t-3xl bg-cliq-navy-800 px-5 py-4">
                <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-cliq-teal" />
                <span className="ml-2 text-sm font-semibold text-white">Live chat</span>
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
                    side: "assistant",
                    text: "Great question. We typically wire up cards, bank transfer, and mobile checkout in about 48 hours and connect them to your invoicing.",
                  },
                  { side: "user", text: "What does a professional business email cost?" },
                  {
                    side: "assistant",
                    text: "We can set up branded business email like hello@yourstore.com. Want a free consultation to scope yours?",
                  },
                ].map((item, i) => (
                  <motion.div variants={chatBubble} key={i}>
                    <ChatBubble side={item.side as "user" | "assistant"} text={item.text} />
                  </motion.div>
                ))}
                <div className="inline-flex gap-1 rounded-full bg-cliq-navy-600 px-3 py-2">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-white/60 [animation-delay:-0.2s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-white/60 [animation-delay:-0.1s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-white/60" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
