import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { JWT } from "next-auth/jwt";
import { isAdminEmail } from "@/server/middleware/admin";

export function protectRoutes(request: NextRequest, token: JWT | null) {
  const { pathname } = request.nextUrl;
  const isDashboardPath = pathname.startsWith("/dashboard");
  const isAdminLogin = pathname === "/admin";
  const isAdminArea = pathname.startsWith("/admin") || pathname.startsWith("/api/admin");

  if (isDashboardPath && !token) {
    const url = request.nextUrl.clone();
    url.pathname = "/signin";
    return NextResponse.redirect(url);
  }

  if (isAdminLogin) {
    return NextResponse.next();
  }

  if (isAdminArea) {
    const email = typeof token?.email === "string" ? token.email : null;
    if (!token || !isAdminEmail(email)) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}
