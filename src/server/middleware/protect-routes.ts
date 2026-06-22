import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { JWT } from "next-auth/jwt";

const ADMIN_MFA_SETUP_PATH = "/admin/mfa-setup";
const ADMIN_MFA_API_PREFIX = "/api/admin/mfa";
const ADMIN_JOIN_PATH = "/admin/join";
const ADMIN_INVITE_API_PREFIX = "/api/admin/invites";

function adminMfaReady(adminToken: JWT | null) {
  if (!adminToken) return false;
  if (adminToken.mfaSetupRequired) return false;
  if (adminToken.mfaVerified === false) return false;
  return true;
}

export function protectRoutes(
  request: NextRequest,
  userToken: JWT | null,
  adminToken: JWT | null,
) {
  const { pathname } = request.nextUrl;
  const isDashboardPath = pathname.startsWith("/dashboard");
  const isAdminLogin = pathname === "/admin";
  const isAdminJoin = pathname === ADMIN_JOIN_PATH;
  const isAdminAuthApi = pathname.startsWith("/api/admin/auth");
  const isAdminInviteApi = pathname.startsWith(ADMIN_INVITE_API_PREFIX);
  const isAdminMfaSetup =
    pathname === ADMIN_MFA_SETUP_PATH || pathname.startsWith(ADMIN_MFA_API_PREFIX);
  const isAdminProtected =
    (pathname.startsWith("/admin") && !isAdminLogin && !isAdminJoin) ||
    (pathname.startsWith("/api/admin") && !isAdminAuthApi && !isAdminInviteApi);

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

  if (adminToken?.mfaSetupRequired && isAdminProtected && !isAdminMfaSetup) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Complete authenticator setup first." }, { status: 403 });
    }
    const url = request.nextUrl.clone();
    url.pathname = ADMIN_MFA_SETUP_PATH;
    return NextResponse.redirect(url);
  }

  if (adminToken && isAdminProtected && !isAdminMfaSetup && !adminMfaReady(adminToken)) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Authenticator verification required." }, { status: 403 });
    }
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
