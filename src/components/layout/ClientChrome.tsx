"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { isTawkConfigured } from "@/lib/tawk";
import { whatsappUrl } from "@/lib/contact";
import { WhatsAppIcon } from "@/components/ui/WhatsAppButton";
import { cn } from "@/lib/utils";

export default function ClientChrome() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  // When Tawk live chat is on, its bubble owns the bottom-right corner; stack WhatsApp above it.
  const tawkEnabled = isTawkConfigured();

  return (
    <>
      <motion.div
        style={{ scaleX, transformOrigin: "left" }}
        className="fixed left-0 right-0 top-0 z-50 h-[3px] bg-gradient-to-r from-brand-400 via-brand-500 to-brand-700"
      />
      <motion.a
        href={whatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0.6, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 260, damping: 18 }}
        className={cn(
          // Mobile only: there's no top navbar there. On desktop the navbar's WhatsApp button covers it.
          "btn-sheen fixed right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-g-button text-white shadow-glow lg:hidden",
          tawkEnabled
            ? "bottom-[calc(var(--site-mobile-tab-height)+6rem)]"
            : "bottom-[calc(var(--site-mobile-tab-height)+1rem)]",
        )}
        title="Chat with us on WhatsApp"
        aria-label="Chat with us on WhatsApp"
      >
        <WhatsAppIcon className="h-6 w-6" />
      </motion.a>
    </>
  );
}
