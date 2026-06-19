const secure = process.env.NODE_ENV === "production";

export const USER_AUTH_COOKIE = secure
  ? "__Secure-cedarce.user.session-token"
  : "cedarce.user.session-token";

export const ADMIN_AUTH_COOKIE = secure
  ? "__Secure-cedarce.admin.session-token"
  : "cedarce.admin.session-token";

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    path: "/",
    secure,
  };
}
