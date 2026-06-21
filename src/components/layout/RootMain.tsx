"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import WayfindingStrip from "@/components/navigation/WayfindingStrip";
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
      {marketing ? (
        <div className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-[1200px] px-4 py-3 sm:px-6 lg:px-8">
            <WayfindingStrip zone="site" />
          </div>
        </div>
      ) : null}
      {children}
    </main>
  );
}
