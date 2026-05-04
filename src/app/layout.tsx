import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SUPPORT_EMAIL } from "@/lib/contact";
import { SITE_URL } from "@/lib/site";
import AppToaster from "@/components/layout/AppToaster";
import RootChrome from "@/components/layout/RootChrome";
import RootFooter from "@/components/layout/RootFooter";
import AuthSessionProvider from "@/components/auth/AuthSessionProvider";
import RootMain from "@/components/layout/RootMain";
import PwaRegister from "@/components/layout/PwaRegister";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Cedarce - Business websites, payments & automation",
    template: "%s | Cedarce",
  },
  description:
    "We set up your website, payments, invoicing, business email, and automation so your business operates like the big players.",
  keywords: [
    "digital business setup",
    "business website development",
    "payment gateway SME",
    "professional business email",
    "invoicing automation",
    "business automation",
    "digital agency",
    "cedarce.ng",
    SUPPORT_EMAIL,
  ],
  openGraph: {
    title: "Cedarce - Business websites, payments & automation",
    description:
      "Websites, payments, invoicing, business email, and automation - delivered as a premium service for growing businesses.",
    url: SITE_URL,
    siteName: "Cedarce Co",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Cedarce — Business websites, payments & automation",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cedarce - Business websites, payments & automation",
    description:
      "We set up your website, payments, invoicing, business email, and automation so your business operates like the big players.",
    images: [
      {
        url: "/og-image.png",
        alt: "Cedarce — Business websites, payments & automation",
      },
    ],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: [{ url: "/favicon.ico" }],
    apple: [{ url: "/apple-icon.png" }],
  },
  manifest: "/manifest.webmanifest",
  applicationName: "Cedarce",
  appleWebApp: {
    capable: true,
    title: "Cedarce",
    statusBarStyle: "default",
  },
  formatDetection: { telephone: false, email: false, address: false },
  robots: { index: true, follow: true },
  metadataBase: new URL(SITE_URL),
};

export const viewport: Viewport = {
  themeColor: "#111122",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <PwaRegister />
        <AuthSessionProvider>
          <AppToaster />
          <RootChrome />
          <RootMain>{children}</RootMain>
          <RootFooter />
        </AuthSessionProvider>
      </body>
    </html>
  );
}
