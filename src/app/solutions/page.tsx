import type { Metadata } from "next";
import SolutionsPageContent from "@/components/marketing/SolutionsPageContent";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Digital solutions by business stage: freelancers, micro-businesses, SMEs, associations, and founders ready to launch.",
};

export default function SolutionsIndexPage() {
  return <SolutionsPageContent />;
}
