import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";
import { prisma } from "@/server/database/prisma";
import { ADMIN_AUTH_COOKIE, sessionCookieOptions } from "@/lib/auth/cookies";
import { validateAdminLogin } from "@/server/services/users";
import { logAuthAuditEvent } from "@/server/services/auth-audit";
import { getRequestMeta } from "@/server/lib/request-meta";
import { verifyTotp } from "@/server/services/mfa";
import { rateLimit } from "@/server/lib/rate-limit";
import type { UserAdminRole } from "@prisma/client";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  totpCode: z.string().optional(),
  setupOnly: z.string().optional(),
});

export const adminAuthOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/admin",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 8,
  },
  cookies: {
    sessionToken: {
      name: ADMIN_AUTH_COOKIE,
      options: sessionCookieOptions(),
    },
  },
  providers: [
    CredentialsProvider({
      id: "admin-credentials",
      name: "Admin credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        totpCode: { label: "Authentication code", type: "text" },
        setupOnly: { label: "Setup only", type: "text" },
      },
      async authorize(rawCredentials, req) {
        const ip =
          req?.headers?.["x-forwarded-for"]?.toString().split(",")[0]?.trim() ??
          req?.headers?.["x-real-ip"]?.toString() ??
          "unknown";
        const limited = rateLimit(`admin-signin:${ip}`, 10);
        if (!limited.ok) throw new Error("RATE_LIMIT");

        const parsed = credentialsSchema.safeParse(rawCredentials);
        if (!parsed.success) return null;

        const admin = await validateAdminLogin(parsed.data.email, parsed.data.password);
        if (!admin) return null;

        const dbUser = await prisma.user.findUnique({ where: { id: admin.id } });
        if (!dbUser?.adminRole) return null;

        const setupOnly = parsed.data.setupOnly === "1";

        if (!dbUser.mfaEnabled) {
          if (setupOnly) {
            return {
              ...admin,
              mfaVerified: false,
              mfaSetupRequired: true,
            };
          }
          return null;
        }

        const code = parsed.data.totpCode?.trim();
        if (!code) return null;
        if (!dbUser.mfaSecret) return null;
        const valid = await verifyTotp(dbUser.mfaSecret, code);
        if (!valid) return null;

        const meta = await getRequestMeta();
        await logAuthAuditEvent({
          actorType: "ADMIN",
          eventType: "ADMIN_SIGN_IN",
          userId: admin.id,
          email: admin.email,
          name: admin.name,
          meta,
        });

        return { ...admin, mfaVerified: true, mfaSetupRequired: false };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.uid = (user as { id: string }).id;
        token.isAdmin = true;
        token.adminRole = (user as { adminRole?: UserAdminRole }).adminRole;
        token.mfaVerified = Boolean((user as { mfaVerified?: boolean }).mfaVerified);
        token.mfaSetupRequired = Boolean((user as { mfaSetupRequired?: boolean }).mfaSetupRequired);
      }

      if (token.uid && !user) {
        const freshUser = await prisma.user.findUnique({
          where: { id: token.uid as string },
          select: { mfaEnabled: true, adminRole: true },
        });
        token.adminRole = freshUser?.adminRole ?? (token.adminRole as UserAdminRole | undefined);
        if (freshUser?.mfaEnabled && token.mfaSetupRequired) {
          token.mfaSetupRequired = false;
          token.mfaVerified = true;
        }
        if (!freshUser?.adminRole) {
          token.isAdmin = false;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { id?: string }).id = token.uid as string;
        (session.user as { isAdmin?: boolean }).isAdmin = Boolean(token.isAdmin);
        (session.user as { adminRole?: UserAdminRole }).adminRole = token.adminRole as UserAdminRole | undefined;
        (session.user as { mfaVerified?: boolean }).mfaVerified = Boolean(token.mfaVerified);
        (session.user as { mfaSetupRequired?: boolean }).mfaSetupRequired = Boolean(token.mfaSetupRequired);
      }
      return session;
    },
  },
};
