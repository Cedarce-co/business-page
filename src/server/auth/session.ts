import { getServerSession } from "next-auth/next";
import { authOptions } from "@/server/auth/options";

export function getServerAuthSession() {
  return getServerSession(authOptions);
}

