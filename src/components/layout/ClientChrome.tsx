"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { Bot, MessageCircle, Send, X } from "lucide-react";
import { motion, useScroll, useSpring } from "framer-motion";
import toast from "react-hot-toast";
import { SUPPORT_EMAIL, SUPPORT_PHONE_DISPLAY } from "@/lib/contact";

type ChatMessage = { role: "user" | "assistant"; text: string };

const STARTER_MESSAGES: ChatMessage[] = [
  {
    role: "assistant",
    text: "Hi, welcome to live chat. Ask me anything about websites, payments, invoicing, email, automation, or pricing.",
  },
];

function aiReply(input: string) {
  const text = input.toLowerCase();

  if (
    text.includes("contact") ||
    text.includes("phone") ||
    text.includes("call") ||
    text.includes("reach you") ||
    text.includes("human")
  ) {
    return `You can reach us at ${SUPPORT_EMAIL} or ${SUPPORT_PHONE_DISPLAY}. The Contact page is also there for a consultation.`;
  }
  if (text.includes("price") || text.includes("cost") || text.includes("pricing")) {
    return "Share what you want to build and we will recommend the best-fit package with a tailored quote.";
  }
  if (text.includes("payment") || text.includes("paystack") || text.includes("flutterwave")) {
    return "We can set up card, bank transfer, and mobile checkout, then connect them to your invoices and receipts in one workflow.";
  }
  if (text.includes("website") || text.includes("site") || text.includes("landing")) {
    return "Yes. We build mobile-first business websites and landing pages designed to look professional and convert visitors.";
  }
  if (text.includes("email")) {
    return "We can set up branded business email (like hello@yourbusiness.com) with proper delivery and domain configuration.";
  }
  if (text.includes("time") || text.includes("how long") || text.includes("delivery")) {
    return "Most business setups go live in about 48 hours, depending on your selected services and readiness of business details.";
  }
  if (text.includes("invoice") || text.includes("receipt")) {
    return "We automate branded invoices and receipts so customers get them instantly after each transaction.";
  }

  return "Great question. We can handle your website, payments, invoicing, email, and automation as one complete setup. Tell me your business type and goal, and I will guide your next best step.";
}

export default function ClientChrome() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(STARTER_MESSAGES);

  const canSend = useMemo(() => input.trim().length > 0, [input]);

  useEffect(() => {
    const openChat = () => setOpen(true);
    window.addEventListener("open-ai-chat", openChat);
    return () => window.removeEventListener("open-ai-chat", openChat);
  }, []);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setMessages((prev) => [...prev, { role: "user", text }, { role: "assistant", text: aiReply(text) }]);
    toast.success("Live chat responded");
    setInput("");
  };

  return (
    <>
      <motion.div
        style={{ scaleX, transformOrigin: "left" }}
        className="fixed left-0 right-0 top-0 z-50 h-[3px] bg-g-brand"
      />
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-cliq-navy-900 text-white shadow-lg transition-transform hover:scale-110"
        style={{ boxShadow: "0 4px 20px rgba(17,17,34,0.35)" }}
        title="Open live chat"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {open ? (
        <div className="fixed bottom-24 right-6 z-50 w-[340px] overflow-hidden rounded-2xl border border-cliq-gray-200 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.20)]">
          <div className="flex items-center justify-between border-b border-cliq-gray-200 bg-cliq-gray-100 px-4 py-3">
            <div className="flex items-center gap-2">
              <Bot className="h-4 w-4 text-cliq-navy-800" />
              <p className="text-sm font-semibold text-cliq-text-heading">Live chat</p>
            </div>
            <button type="button" onClick={() => setOpen(false)} className="text-cliq-text-muted hover:text-cliq-text-heading">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="max-h-[330px] space-y-3 overflow-y-auto p-4">
            {messages.map((message, idx) => (
              <div
                key={`${message.role}-${idx}`}
                className={
                  message.role === "user"
                    ? "ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-cliq-navy-900 px-3 py-2 text-sm text-white"
                    : "max-w-[92%] rounded-2xl rounded-bl-sm bg-cliq-gray-100 px-3 py-2 text-sm text-cliq-text-body"
                }
              >
                {message.text}
              </div>
            ))}
          </div>
          <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-cliq-gray-200 p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a business question..."
              className="h-10 flex-1 rounded-xl border border-cliq-gray-300 px-3 text-sm outline-none focus:border-cliq-navy-700"
            />
            <button
              type="submit"
              disabled={!canSend}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-cliq-navy-900 text-white disabled:opacity-40"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      ) : null}
    </>
  );
}
