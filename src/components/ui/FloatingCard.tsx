/*
  ┌─────────────────────────────────────────────────────────┐
  │  CEDARCE COLOUR REFERENCE - paste in every component   │
  └─────────────────────────────────────────────────────────┘
*/
"use client";

import { motion } from "framer-motion";
import { floatLoop } from "@/lib/animations";

export default function FloatingCard({
  icon,
  title,
  meta,
  index,
}: {
  icon: string;
  title: string;
  meta: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={floatLoop(index * 0.8)}
      transition={{ delay: 0.1 * index }}
      className="flex items-center gap-3 rounded-2xl border border-cliq-gray-200 bg-white px-4 py-3 shadow-card"
    >
      <span>{icon}</span>
      <div>
        <p className="text-sm font-semibold text-cliq-text-heading">{title}</p>
        <p className="text-xs text-cliq-text-muted">{meta}</p>
      </div>
    </motion.div>
  );
}
