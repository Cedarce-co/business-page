import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";
import { prisma } from "@/server/database/prisma";
import { validateAdminLogin, validateCredentials } from "@/server/services/users";
import { isAdminEmail } from "@/lib/admin";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(rawCredentials) {
        const parsed = credentialsSchema.safeParse(rawCredentials);
        if (!parsed.success) return null;
        const admin = await validateAdminLogin(parsed.data.email, parsed.data.password);
        if (admin) return admin;
        return validateCredentials(parsed.data.email, parsed.data.password);
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.uid = (user as { id: string }).id;
        token.kycComplete = Boolean((user as { kycComplete?: boolean }).kycComplete);
        token.isAdmin = isAdminEmail((user as { email?: string | null }).email);
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
        token.isAdmin = isAdminEmail(freshUser?.email);
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { id?: string }).id = token.uid as string;
        (session.user as { kycComplete?: boolean }).kycComplete = Boolean(token.kycComplete);
        (session.user as { isAdmin?: boolean }).isAdmin = Boolean(token.isAdmin);
        (session.user as { image?: string | null }).image = (token.picture as string | undefined) ?? null;
      }
      return session;
    },
  },
};

