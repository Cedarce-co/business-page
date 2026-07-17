"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import ClientChrome from "@/components/layout/ClientChrome";
import MobileStickyCta from "@/components/layout/MobileStickyCta";

const AwarenessPromo = dynamic(() => import("@/components/layout/AwarenessPromo"), {
  ssr: false,
});

const APP_PATHS = ["/signin", "/signup", "/forgot-password", "/reset-password", "/dashboard", "/admin", "/offline"];

export default function RootChrome() {
  const pathname = usePathname();
  const isAppArea = APP_PATHS.some((prefix) => pathname?.startsWith(prefix));

  if (isAppArea) return null;

  return (
    <>
      <ClientChrome />
      <Navbar />
      <AwarenessPromo />
      <MobileStickyCta />
    </>
  );
}
