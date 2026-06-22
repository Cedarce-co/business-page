import type { Session } from "next-auth";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/server/auth/options";

export async function getUserSession(): Promise<Session | null> {
  return getServerSession(authOptions);
}

export function getServerAuthSession() {
  return getUserSession();
}
