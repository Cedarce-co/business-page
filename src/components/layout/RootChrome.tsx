"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import ClientChrome from "@/components/layout/ClientChrome";
import AwarenessPromo from "@/components/layout/AwarenessPromo";

const APP_PATHS = ["/signin", "/signup", "/dashboard", "/admin"];

export default function RootChrome() {
  const pathname = usePathname();
  const isAppArea = APP_PATHS.some((prefix) => pathname?.startsWith(prefix));

  if (isAppArea) return null;

  return (
    <>
      <ClientChrome />
      <Navbar />
      <AwarenessPromo />
    </>
  );
}
