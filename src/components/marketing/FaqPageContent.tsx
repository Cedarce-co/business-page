"use client";

import MarketingSplitShell from "@/components/marketing/MarketingSplitShell";
import FaqAccordion from "@/components/marketing/FaqAccordion";
import FaqFeedbackSection from "@/components/marketing/FaqFeedbackSection";
import { FAQ_HERO_IMAGE } from "@/lib/marketing-images";

export default function FaqPageContent() {
  return (
    <>
      <MarketingSplitShell
        image={FAQ_HERO_IMAGE}
        eyebrow="FAQ"
        title="Questions before you commit"
        description="Straight answers about packages, timelines, and support."
      >
        <div className="rounded-2xl border border-white/10 bg-zinc-950 p-4 sm:rounded-[1.75rem] sm:p-8">
          <FaqAccordion />
        </div>
        <div className="mt-8 hidden sm:block">
          <FaqFeedbackSection />
        </div>
      </MarketingSplitShell>
    </>
  );
}
