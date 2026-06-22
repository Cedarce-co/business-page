import { cookies, headers } from "next/headers";
import type { JWT } from "next-auth/jwt";
import { getToken } from "next-auth/jwt";
import { ADMIN_AUTH_COOKIE, USER_AUTH_COOKIE } from "@/lib/auth/cookies";

async function readJwt(cookieName: string): Promise<JWT | null> {
  const secret = process.env.NEXTAUTH_SECRET;
  if (!secret) return null;

  const cookieStore = await cookies();
  if (!cookieStore.get(cookieName)?.value) return null;

  const headerStore = await headers();
  const cookieHeader = headerStore.get("cookie");
  if (!cookieHeader) return null;

  return getToken({
    req: {
      headers: {
        cookie: cookieHeader,
      },
    } as Parameters<typeof getToken>[0]["req"],
    secret,
    cookieName,
    secureCookie: process.env.NODE_ENV === "production",
  });
}

export function getUserJwt() {
  return readJwt(USER_AUTH_COOKIE);
}

export function getAdminJwt() {
  return readJwt(ADMIN_AUTH_COOKIE);
}
