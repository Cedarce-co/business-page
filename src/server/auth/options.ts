import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";
import { prisma } from "@/server/database/prisma";
import { validateCredentials } from "@/server/services/users";
import { USER_AUTH_COOKIE, sessionCookieOptions } from "@/lib/auth/cookies";
import { logAuthAuditEvent } from "@/server/services/auth-audit";
import { getRequestMeta } from "@/server/lib/request-meta";
import { verifyTotp } from "@/server/services/mfa";
import { rateLimit, rateLimitResponse } from "@/server/lib/rate-limit";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  totpCode: z.string().optional(),
});

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 12,
  },
  cookies: {
    sessionToken: {
      name: USER_AUTH_COOKIE,
      options: sessionCookieOptions(),
    },
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        totpCode: { label: "Authentication code", type: "text" },
      },
      async authorize(rawCredentials, req) {
        const ip =
          req?.headers?.["x-forwarded-for"]?.toString().split(",")[0]?.trim() ??
          req?.headers?.["x-real-ip"]?.toString() ??
          "unknown";
        const limited = rateLimit(`user-signin:${ip}`, 10);
        if (!limited.ok) throw new Error("RATE_LIMIT");

        const parsed = credentialsSchema.safeParse(rawCredentials);
        if (!parsed.success) return null;

        const dbUser = await prisma.user.findUnique({
          where: { email: parsed.data.email.toLowerCase() },
          include: { kyc: true },
        });
        if (!dbUser) return null;

        const user = await validateCredentials(parsed.data.email, parsed.data.password);
        if (!user) return null;

        if (dbUser.mfaEnabled && dbUser.mfaSecret) {
          const code = parsed.data.totpCode?.trim();
          if (!code) return null;
          const valid = await verifyTotp(dbUser.mfaSecret, code);
          if (!valid) return null;
        }

        const meta = await getRequestMeta();
        await logAuthAuditEvent({
          actorType: "USER",
          eventType: "SIGN_IN",
          userId: user.id,
          email: user.email,
          name: user.name,
          meta,
        });

        return { ...user, mfaVerified: true, mfaSetupRequired: false };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.uid = (user as { id: string }).id;
        token.kycComplete = Boolean((user as { kycComplete?: boolean }).kycComplete);
        token.isAdmin = false;
        token.mfaVerified = Boolean((user as { mfaVerified?: boolean }).mfaVerified);
        token.mfaSetupRequired = Boolean((user as { mfaSetupRequired?: boolean }).mfaSetupRequired);
      }

      if (token.uid) {
        const freshUser = await prisma.user.findUnique({
          where: { id: token.uid as string },
          include: { kyc: true },
        });
        token.name = freshUser?.name ?? token.name;
        token.email = freshUser?.email ?? token.email;
        token.picture = freshUser?.image ?? token.picture;
        token.kycComplete = freshUser?.kyc?.status === "APPROVED";
        token.isAdmin = false;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { id?: string }).id = token.uid as string;
        (session.user as { kycComplete?: boolean }).kycComplete = Boolean(token.kycComplete);
        (session.user as { isAdmin?: boolean }).isAdmin = Boolean(token.isAdmin);
        (session.user as { mfaVerified?: boolean }).mfaVerified = Boolean(token.mfaVerified);
        (session.user as { mfaSetupRequired?: boolean }).mfaSetupRequired = Boolean(token.mfaSetupRequired);
        (session.user as { image?: string | null }).image = (token.picture as string | undefined) ?? null;
      }
      return session;
    },
  },
};

export function isRateLimitAuthError(error: unknown) {
  return error instanceof Error && error.message === "RATE_LIMIT";
}

export { rateLimitResponse };
