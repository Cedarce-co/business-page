import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
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
    default: "Cedarce — Your Digital Business Buddy | Nigeria",
    template: "%s | Cedarce",
  },
  description:
    "Nigeria's digital business buddy. We set up your website, payments, invoicing, business email, and automation professionally. One click and your business goes pro.",
  keywords: [
    "digital business setup Nigeria",
    "website development Lagos",
    "payment gateway Nigeria SME",
    "business email Nigeria",
    "professional business setup Nigeria",
    "invoicing system Nigeria",
    "WhatsApp automation Nigeria",
    "digital agency Lagos",
    "Cedarce",
    "cedarce.ng",
  ],
  openGraph: {
    title: "Cedarce — Your Digital Business Buddy",
    description:
      "Nigeria's digital business buddy. Website, payments, invoicing, email, automation — done for you professionally.",
    url: "https://cedarce.ng",
    siteName: "Cedarce",
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cedarce — Your Digital Business Buddy",
    description: "Nigeria's digital business buddy. One click and your business goes pro.",
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
