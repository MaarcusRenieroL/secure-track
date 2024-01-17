import { registerSchema } from "@/lib/zod-schema";
import { adminProcedure, publicProcedure, router } from "@/server/trpc";
import { db } from "@/lib/db";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcryptjs";
import { userSchema } from "@/lib/zod-schema";
import { getUserByEmail, getUserById } from "@/lib/helpers";

export const userRouter = router({
  addUser: publicProcedure.input(registerSchema).mutation(async ({ input }) => {
    try {
      const { email, password, confirmPassword } = input;
      if (!email || !password || !confirmPassword) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Missing required fields",
        });
      }
      const existingUser = await db.user.findFirst({
        where: {
          email: email,
        },
      });
      if (!existingUser) {
        const user = await db.user.create({
          data: {
            email: email,
            password: await bcrypt.hash(password, 10),
          },
        });
        return user;
      } else {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User already exists",
        });
      }
    } catch (error) {
      console.log(error);
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Error creating user",
      });
    }
  }),
  addOrgUser: adminProcedure.input(userSchema).mutation(async ({ ctx, input }) => {
    try {
      const { userId } = ctx;
      const { email, password, confirmPassword } = input;
      if (!email || !password || !confirmPassword) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Missing required fields",
        });
      }
      const existingUser = await getUserByEmail(email);
      const adminUser = await getUserById(userId);

      if (!existingUser) {
        const user = await db.user.create({
          data: {
            email: email,
            password: await bcrypt.hash(password, 10),
            organizationId: adminUser?.organizationId,
          },
        });
        return user;
      } else {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User already exists",
        });
      }
    } catch (error) {
      console.log(error);
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Error creating user",
      });
    }
  }),
});
