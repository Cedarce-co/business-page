import type { Metadata } from "next";
import ProductPageContent from "@/components/marketing/ProductPageContent";

export const metadata: Metadata = {
  title: "Product",
  description:
    "The Cedarce platform: client portal, verification, service intake, and admin operations for professional digital delivery.",
};

export default function ProductPage() {
  return <ProductPageContent />;
}
