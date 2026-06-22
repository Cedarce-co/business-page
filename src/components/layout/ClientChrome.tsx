"use client";

import { useEffect } from "react";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { motion, useScroll, useSpring } from "framer-motion";
import TawkToWidget from "@/components/layout/TawkToWidget";
import { isTawkConfigured, openTawkChat } from "@/lib/tawk";

export default function ClientChrome() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const tawkEnabled = isTawkConfigured();

  useEffect(() => {
    const openChat = () => {
      if (isTawkConfigured()) {
        openTawkChat();
        return;
      }
      window.location.href = "/contact";
    };
    window.addEventListener("open-live-chat", openChat);
    return () => window.removeEventListener("open-live-chat", openChat);
  }, []);

  return (
    <>
      <TawkToWidget />
      <motion.div
        style={{ scaleX, transformOrigin: "left" }}
        className="fixed left-0 right-0 top-0 z-50 h-[3px] bg-g-brand"
      />
      {!tawkEnabled ? (
        <Link
          href="/contact"
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-cliq-navy-900 text-white shadow-lg transition-transform hover:scale-110"
          style={{ boxShadow: "0 4px 20px rgba(17,17,34,0.35)" }}
          title="Contact our team"
          aria-label="Contact our team"
        >
          <MessageCircle className="h-6 w-6" />
        </Link>
      ) : null}
    </>
  );
}
