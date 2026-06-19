import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { JWT } from "next-auth/jwt";

export function protectRoutes(
  request: NextRequest,
  userToken: JWT | null,
  adminToken: JWT | null,
) {
  const { pathname } = request.nextUrl;
  const isDashboardPath = pathname.startsWith("/dashboard");
  const isAdminLogin = pathname === "/admin";
  const isAdminAuthApi = pathname.startsWith("/api/admin/auth");
  const isAdminProtected =
    (pathname.startsWith("/admin") && !isAdminLogin) ||
    (pathname.startsWith("/api/admin") && !isAdminAuthApi);

  if (isDashboardPath && !userToken) {
    const url = request.nextUrl.clone();
    url.pathname = "/signin";
    return NextResponse.redirect(url);
  }

  if (isAdminProtected && !adminToken) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
