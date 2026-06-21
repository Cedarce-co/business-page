import { notFound } from "next/navigation";
import type { Metadata } from "next";
import MarketingDetailPage from "@/components/marketing/MarketingDetailPage";
import { allMarketingSlugs, getMarketingPage } from "@/lib/marketing-detail-pages";

export function generateStaticParams() {
  return allMarketingSlugs("product").map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getMarketingPage("product", slug);
  if (!page) return { title: "Product" };
  return { title: page.title, description: page.lead };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getMarketingPage("product", slug);
  if (!page) notFound();
  return <MarketingDetailPage page={page} />;
}
