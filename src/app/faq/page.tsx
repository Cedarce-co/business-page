import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/marketing/PageHero";
import FaqAccordion from "@/components/marketing/FaqAccordion";
import FaqFeedbackSection from "@/components/marketing/FaqFeedbackSection";
import FinalCTASection from "@/components/home/FinalCTASection";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers about Cedarce packages, setup timelines, support, payments, and how we work with your business.",
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        badge="FAQ"
        title="Questions before you commit"
        description="Packages, timelines, support, and how we scope work with you. Still unsure? Book a free consult."
      >
        <Link
          href="/contact"
          className="text-sm font-semibold text-cliq-teal underline-offset-4 hover:underline"
        >
          Talk to our team →
        </Link>
      </PageHero>

      <section className="bg-cliq-gray-100 py-20">
        <div className="mx-auto max-w-[900px] px-4 sm:px-6 lg:px-8">
          <FaqAccordion />
          <FaqFeedbackSection />
        </div>
      </section>

      <FinalCTASection />
    </>
  );
}
