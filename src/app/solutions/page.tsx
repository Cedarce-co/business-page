import type { Metadata } from "next";
import SolutionsPageContent from "@/components/marketing/SolutionsPageContent";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Business setups for small businesses; shops and stores that track sales and inventory; medium businesses; associations; and founders ready to launch.",
};

export default function SolutionsIndexPage() {
  return <SolutionsPageContent />;
}
