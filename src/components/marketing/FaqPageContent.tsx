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
        title="Questions people ask us"
        description="Simple answers about our packages, timing and help."
      >
        <FaqAccordion />
        <div className="mt-8 hidden sm:block">
          <FaqFeedbackSection />
        </div>
      </MarketingSplitShell>
    </>
  );
}
