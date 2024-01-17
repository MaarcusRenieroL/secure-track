import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

import { ZodError } from "zod";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export const createTRPCContext = async (opts: FetchCreateContextFnOptions) => {
  const req = opts.req;
  return { req };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});
const middleware = t.middleware;

const isAuth = middleware(async (opts) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  const { user } = session;

  if (!user || !user.id) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return opts.next({
    ctx: {
      userId: user.id,
      user,
    },
  });
});

const isAdmin = middleware(async (opts) => {
  const session = await getServerSession(authOptions); // getting server session
  if (!session) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  const { user } = session;

  if (!user || !user.id || user.role !== "ADMIN") {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return opts.next({
    ctx: {
      userId: user.id,
      user,
      db,
    },
  });
});

const isCombined = middleware(async (opts) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  const { user } = session;

  if (!user || !user.id || user.role === "CREW" || user.role === "PASSENGER") {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return opts.next({
    ctx: {
      userId: user.id,
      user,
    },
  });
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(isAuth);
export const adminProcedure = t.procedure.use(isAdmin);
export const combinedProcedure = t.procedure.use(isCombined);
