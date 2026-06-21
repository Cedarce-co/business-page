import { notFound } from "next/navigation";
import type { Metadata } from "next";
import MarketingDetailPage from "@/components/marketing/MarketingDetailPage";
import { allMarketingSlugs, getMarketingPage } from "@/lib/marketing-detail-pages";

export function generateStaticParams() {
  return allMarketingSlugs("solution").map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getMarketingPage("solution", slug);
  if (!page) return { title: "Solutions" };
  return { title: page.title, description: page.lead };
}

export default async function SolutionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getMarketingPage("solution", slug);
  if (!page) notFound();
  return <MarketingDetailPage page={page} />;
}
