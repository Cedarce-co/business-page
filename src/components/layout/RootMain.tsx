"use client";

import { usePathname } from "next/navigation";
import WayfindingStrip from "@/components/navigation/WayfindingStrip";
import { isPublicMarketingWithNavbar } from "@/lib/public-site-routes";

export default function RootMain({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // `usePathname()` can briefly be undefined on initial mount in dev/hydration.
  // Fall back to the real browser location to avoid content flashing under the fixed navbar.
  const resolvedPath =
    pathname ?? (typeof window !== "undefined" ? window.location.pathname : undefined);
  const marketing = isPublicMarketingWithNavbar(resolvedPath);

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
