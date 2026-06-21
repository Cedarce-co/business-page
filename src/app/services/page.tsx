import type { Metadata } from "next";
import SolutionsPageContent from "@/components/marketing/SolutionsPageContent";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Digital solutions by business stage and outcome — web presence, payments, email, campaigns, and operations for SMEs.",
};

export default function SolutionsPage() {
  return <SolutionsPageContent />;
}
