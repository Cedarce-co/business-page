"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/layout/Footer";

const APP_PATHS = ["/signin", "/signup", "/dashboard", "/admin"];

export default function RootFooter() {
  const pathname = usePathname();
  const isAppArea = APP_PATHS.some((prefix) => pathname?.startsWith(prefix));

  if (isAppArea) return null;

  return <Footer />;
}

