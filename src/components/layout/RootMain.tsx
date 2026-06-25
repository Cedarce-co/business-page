"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { isPublicMarketingWithNavbar } from "@/lib/public-site-routes";

export default function RootMain({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const marketing = mounted && isPublicMarketingWithNavbar(pathname);

  return (
    <main className={marketing ? "public-site-main flex-1" : "flex-1"}>
      {children}
    </main>
  );
}
