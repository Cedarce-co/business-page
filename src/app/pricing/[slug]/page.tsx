import { notFound } from "next/navigation";
import type { Metadata } from "next";
import MarketingDetailPage from "@/components/marketing/MarketingDetailPage";
import { allMarketingSlugs, getMarketingPage } from "@/lib/marketing-detail-pages";

export function generateStaticParams() {
  return allMarketingSlugs("pricing").map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getMarketingPage("pricing", slug);
  if (!page) return { title: "Pricing" };
  return { title: page.title, description: page.lead };
}

export default async function PricingDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getMarketingPage("pricing", slug);
  if (!page) notFound();
  return <MarketingDetailPage page={page} />;
}
