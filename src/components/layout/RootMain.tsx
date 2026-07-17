"use client";

import { usePathname } from "next/navigation";
import { isPublicDarkTheme, isPublicMarketingWithNavbar } from "@/lib/public-site-routes";
import { cn } from "@/lib/utils";

export default function RootMain({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const marketing = isPublicMarketingWithNavbar(pathname);
  const darkPublic = isPublicDarkTheme(pathname);

  return (
    <main
      className={cn(
        "flex-1",
        marketing && "public-site-main",
        darkPublic && "site-public bg-black text-white",
      )}
    >
      {children}
    </main>
  );
}
