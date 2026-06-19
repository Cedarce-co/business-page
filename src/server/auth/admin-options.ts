import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";
import { ADMIN_AUTH_COOKIE, sessionCookieOptions } from "@/lib/auth/cookies";
import { validateAdminLogin } from "@/server/services/users";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const adminAuthOptions: NextAuthOptions = {
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
        return validateAdminLogin(parsed.data.email, parsed.data.password);
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
