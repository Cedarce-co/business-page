"use client";

import { useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import TawkToWidget from "@/components/layout/TawkToWidget";
import { isTawkConfigured, openTawkChat } from "@/lib/tawk";

export default function ClientChrome() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

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
    </>
  );
}
