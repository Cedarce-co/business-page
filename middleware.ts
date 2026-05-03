import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { protectRoutes } from "@/server/middleware/protect-routes";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  return protectRoutes(request, token);
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/api/admin/:path*"],
};
