"use client";

import Link from "next/link";
import MarketingSplitShell from "@/components/marketing/MarketingSplitShell";
import FaqAccordion from "@/components/marketing/FaqAccordion";
import FaqFeedbackSection from "@/components/marketing/FaqFeedbackSection";
import Button from "@/components/ui/Button";
import { FAQ_HERO_IMAGE } from "@/lib/marketing-images";

export default function FaqPageContent() {
  return (
    <>
      <MarketingSplitShell
        image={FAQ_HERO_IMAGE}
        eyebrow="FAQ"
        title="Questions before you commit"
        description="Packages, timelines, support, and how we scope work with you. Still unsure? Book a free consult."
        aside={
          <ul className="space-y-3 text-sm text-white/70">
            <li className="flex gap-2">
              <span className="text-cedar-accent">✓</span> Clear package breakdowns
            </li>
            <li className="flex gap-2">
              <span className="text-cedar-accent">✓</span> Setup timelines explained
            </li>
            <li className="flex gap-2">
              <span className="text-cedar-accent">✓</span> Human support, not ticket loops
            </li>
          </ul>
        }
      >
        <div className="rounded-2xl border border-white/10 bg-zinc-950 p-4 sm:rounded-[1.75rem] sm:p-8">
          <FaqAccordion />
        </div>
        <div className="mt-8">
          <FaqFeedbackSection />
        </div>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Button href="/contact" variant="accent" className="min-h-12 px-7">
            Book free consultation
          </Button>
          <Link
            href="/contact"
            className="text-sm font-semibold text-cedar-accent underline-offset-4 hover:underline"
          >
            Talk to our team →
          </Link>
        </div>
      </MarketingSplitShell>
    </>
  );
}
