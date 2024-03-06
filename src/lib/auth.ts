import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { getServerSession } from "next-auth";
import type { Session, NextAuthOptions } from "next-auth";
import { db } from "@/lib/db";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import type { UserRole } from "@prisma/client";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    // eslint-disable-next-line
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.role = token.role as UserRole;
        session.user.isOnboarded = token.isOnboarded;
        session.user.organizationId = token.organizationId;
        session.user.routeId = token.routeId;
        session.user.stopId = token.stopId;
      }
      return session;
    },
    // eslint-disable-next-line
    async jwt({ token, user, trigger, session: nextSession }) {
      const session = nextSession as Session;
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email!,
        },
      });
      if (!dbUser) {
        token.id = user.id;
        return token;
      }
      if (trigger === "update") {
        return { ...token, ...session };
      }

      // @typescript-eslint/no-unnecessary-type-assertion
      return {
        id: dbUser.userId,
        email: dbUser.email,
        role: dbUser.role,
        isOnboarded: dbUser.isOnboarded,
        organizationId: dbUser.organizationId,
        routeId: dbUser.routeId ?? "",
        stopId: dbUser.stopId,
      };
    },
  },
  adapter: PrismaAdapter(db),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          type: "email",
        },
        password: {
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        if (!credentials.email || !credentials.password) {
          return null;
        }

        try {
          const user = await db.user.findFirst({
            where: {
              email: credentials.email,
            },
          });

          if (!user) {
            return null;
          }

          const isValidPassword = await bcrypt.compare(
            credentials.password,
            user.password,
          );

          if (!isValidPassword) {
            return null;
          }

          return {
            id: user.userId,
            email: user.email,
            role: user.role,
          };
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
};

export const getServerAuthSession = () => getServerSession(authOptions);
