import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";
import { ADMIN_AUTH_COOKIE, sessionCookieOptions } from "@/lib/auth/cookies";
import { validateAdminLogin } from "@/server/services/users";
import { logAuthAuditEvent } from "@/server/services/auth-audit";
import { getRequestMeta } from "@/server/lib/request-meta";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const adminAuthOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/admin",
  },
  session: {
    strategy: "jwt",
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
      },
      async authorize(rawCredentials) {
        const parsed = credentialsSchema.safeParse(rawCredentials);
        if (!parsed.success) return null;
        const admin = await validateAdminLogin(parsed.data.email, parsed.data.password);
        if (!admin) return null;

        const meta = await getRequestMeta();
        await logAuthAuditEvent({
          actorType: "ADMIN",
          eventType: "ADMIN_SIGN_IN",
          userId: admin.id,
          email: admin.email,
          name: admin.name,
          meta,
        });

        return admin;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.uid = (user as { id: string }).id;
        token.isAdmin = true;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { id?: string }).id = token.uid as string;
        (session.user as { isAdmin?: boolean }).isAdmin = true;
      }
      return session;
    },
  },
};
