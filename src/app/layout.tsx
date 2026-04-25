import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SUPPORT_EMAIL } from "@/lib/contact";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ClientChrome from "@/components/layout/ClientChrome";
import AppToaster from "@/components/layout/AppToaster";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Cedarce — Digital business services",
    template: "%s | Cedarce",
  },
  description:
    "Cedarce is a digital business practice. We set up your website, payments, invoicing, business email, and automation so you operate like the big players — from informal to professional.",
  keywords: [
    "digital business setup",
    "business website development",
    "payment gateway SME",
    "professional business email",
    "invoicing automation",
    "business automation",
    "digital agency",
    "Cedarce",
    "cedarce.ng",
    SUPPORT_EMAIL,
  ],
  openGraph: {
    title: "Cedarce — Digital business services",
    description:
      "Website, payments, invoicing, email, and automation — delivered as a professional service, not a boxed product.",
    url: "https://cedarce.ng",
    siteName: "Cedarce",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cedarce — Digital business services",
    description:
      "We set up your website, payments, invoicing, emails, and automation so your business operates like the big players.",
  },
  robots: { index: true, follow: true },
  metadataBase: new URL("https://cedarce.ng"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <ClientChrome />
        <AppToaster />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
