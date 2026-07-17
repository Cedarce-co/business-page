"use client";

import { motion, useReducedMotion } from "framer-motion";
import SectionReveal from "@/components/ui/SectionReveal";
import SectionLabel from "@/components/ui/SectionLabel";
import Button from "@/components/ui/Button";
import ChatBubble from "@/components/ui/ChatBubble";
import { openTawkChat, isTawkConfigured } from "@/lib/tawk";
import { chatBubble, staggerSlow, viewport } from "@/lib/animations";

export default function AIBuddySection() {
  const reduced = useReducedMotion();

  return (
    <SectionReveal id="home-section-live-chat" className="bg-zinc-950 py-14 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col items-center text-center lg:items-center">
            <SectionLabel>Live chat</SectionLabel>
            <h2 className="mt-4 font-display text-[1.85rem] leading-tight text-cedar-ivory sm:mt-5 sm:text-4xl lg:text-5xl">
              Questions before you commit?
              <br />
              Get answers.
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-cedar-mist sm:mt-4 sm:text-lg">
              Ask what it costs, how long it takes, and what you need first. A real person on our team responds.
            </p>
            <div className="mt-6 w-full max-w-xs sm:mt-8">
              <Button
                full
                variant="accent"
                onClick={() => {
                  if (isTawkConfigured()) {
                    openTawkChat();
                    return;
                  }
                  window.location.href = "/contact";
                }}
              >
                Chat with our team →
              </Button>
            </div>
          </div>

          <div className="mx-auto w-full max-w-md lg:mx-0 lg:max-w-lg lg:justify-self-end">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-black lg:rounded-none">
              <div className="flex items-center border-b border-white/10 px-4 py-3 sm:px-5 sm:py-4">
                <span className="h-2 w-2 rounded-full bg-cedar-accent" />
                <span className="ml-2 text-sm font-semibold text-cedar-ivory">Live chat</span>
                <span className="ml-2 text-xs text-cedar-mist">· Online now</span>
              </div>
              <motion.div
                variants={staggerSlow}
                initial={reduced ? false : "hidden"}
                whileInView="visible"
                viewport={viewport}
                className="space-y-2.5 p-4 sm:space-y-3 sm:p-5"
              >
                {[
                  { side: "user", text: "How do I start accepting payments online for my food store?" },
                  {
                    side: "assistant",
                    text: "We can set up cards, bank transfer, and mobile checkout in about 48 hours and connect them to your invoicing.",
                  },
                  { side: "user", text: "What does a professional business email cost?" },
                  {
                    side: "assistant",
                    text: "We can set up branded business email like hello@yourstore.com. Want a free consultation to scope yours?",
                  },
                ].map((item, i) => (
                  <motion.div variants={chatBubble} key={i} className={i > 1 ? "hidden sm:block" : undefined}>
                    <ChatBubble side={item.side as "user" | "assistant"} text={item.text} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}
