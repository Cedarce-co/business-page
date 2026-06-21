import { cookies } from "next/headers";
import type { JWT } from "next-auth/jwt";
import { getToken } from "next-auth/jwt";
import { ADMIN_AUTH_COOKIE, USER_AUTH_COOKIE } from "@/lib/auth/cookies";

async function readJwt(cookieName: string): Promise<JWT | null> {
  const cookieStore = await cookies();
  return getToken({
    req: {
      headers: {
        cookie: cookieStore.toString(),
      },
    } as Parameters<typeof getToken>[0]["req"],
    secret: process.env.NEXTAUTH_SECRET,
    cookieName,
  });
}

export function getUserJwt() {
  return readJwt(USER_AUTH_COOKIE);
}

export function getAdminJwt() {
  return readJwt(ADMIN_AUTH_COOKIE);
}
