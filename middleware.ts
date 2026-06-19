import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { ADMIN_AUTH_COOKIE, USER_AUTH_COOKIE } from "@/lib/auth/cookies";
import { protectRoutes } from "@/server/middleware/protect-routes";

export async function middleware(request: NextRequest) {
  const secret = process.env.NEXTAUTH_SECRET;
  const [userToken, adminToken] = await Promise.all([
    getToken({ req: request, secret, cookieName: USER_AUTH_COOKIE }),
    getToken({ req: request, secret, cookieName: ADMIN_AUTH_COOKIE }),
  ]);
  return protectRoutes(request, userToken, adminToken);
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/api/admin/:path*"],
};
