"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import ClientChrome from "@/components/layout/ClientChrome";
import MobileBottomNav from "@/components/layout/MobileBottomNav";

/** Full chrome hidden (no navbar/promo). Bottom tab nav still shown on auth. */
const APP_PATHS = ["/signin", "/signup", "/forgot-password", "/reset-password", "/dashboard", "/admin", "/offline"];
const AUTH_TAB_PATHS = ["/signin", "/signup"];

export default function RootChrome() {
  const pathname = usePathname() ?? "";
  const isAppArea = APP_PATHS.some((prefix) => pathname.startsWith(prefix));
  const showAuthTabs = AUTH_TAB_PATHS.some((prefix) => pathname.startsWith(prefix));

  if (isAppArea) {
    return showAuthTabs ? <MobileBottomNav /> : null;
  }

  return (
    <>
      <ClientChrome />
      <Navbar />
      <MobileBottomNav />
    </>
  );
}
