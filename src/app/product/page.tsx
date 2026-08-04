import type { Metadata } from "next";
import ProductPageContent from "@/components/marketing/ProductPageContent";

export const metadata: Metadata = {
  title: "Product",
  description:
    "Websites, payments, business email, invoicing, campaigns, and integrations. the digital products Cedarce sets up for your business.",
};

export default function ProductIndexPage() {
  return <ProductPageContent />;
}
