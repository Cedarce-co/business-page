import type { Metadata } from "next";
import FaqPageContent from "@/components/marketing/FaqPageContent";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers about Cedarce packages, setup timelines, support, payments, and how we work with your business.",
};

export default function FaqPage() {
  return <FaqPageContent />;
}
