// @typescript-eslint/no-unused-vars
import type { Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: enum;
    isOnboarded: boolean;
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      id: string;
      role: enum;
      isOnboarded: boolean;
    };
  }
}
