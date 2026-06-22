import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      kycComplete: boolean;
      isAdmin: boolean;
      mfaVerified?: boolean;
      mfaSetupRequired?: boolean;
      adminRole?: "SUPER_ADMIN" | "ADMIN";
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    uid?: string;
    kycComplete?: boolean;
    isAdmin?: boolean;
    mfaVerified?: boolean;
    mfaSetupRequired?: boolean;
    adminRole?: "SUPER_ADMIN" | "ADMIN";
  }
}
