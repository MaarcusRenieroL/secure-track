import { registerSchema, updateUserSchema } from "@/lib/zod-schema";
import { adminProcedure, combinedProcedure, publicProcedure, router } from "@/server/trpc";
import { db } from "@/lib/db";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcryptjs";
import { userSchema } from "@/lib/zod-schema";
import { getUserByEmail, getUserById } from "@/lib/helpers";
import * as z from "zod";
import { UserRole } from "@prisma/client";

export const userRouter = router({
  getUsers: combinedProcedure.query(async ({ ctx }) => {
    try {
      const { userId } = ctx;
      const user = await db.user.findUnique({
        where: {
          userId: userId,
        },
      });
      if (user?.role === "SUPER_ADMIN") {
        return await db.user.findMany();
      } else {
        const user = await db.user.findUnique({
          where: {
            userId: userId,
          },
        });
        return await db.user.findMany({
          where: {
            organizationId: user?.organizationId,
          },
        });
      }
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
      });
    }
  }),
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
  updateOrgUser: adminProcedure.input(updateUserSchema).mutation(async ({ input }) => {
    try {

      const { userId, role } = input;

      const user = await getUserById(userId);

      if (!user) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Error finding user",
        });
      }

      if (role === user.role) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Please update the user data"
        })
      }

      const updateUser = await db.user.update({
        where: {
          userId: userId
        }, data: {
          role: role as UserRole
        }
      });

      return {
        success: true,
        status: 200,
        message: "User Deleted Successfully",
        data: updateUser.userId,
      };
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
      });
    }
  }),
  deleteUser: adminProcedure.input(z.string()).mutation(async ({ input }) => {
    try {
      const deleteUser = await db.user.delete({
        where: {
          userId: input,
        },
      });
      console.log(deleteUser.userId);

      return {
        success: true,
        status: 200,
        message: "User Deleted Successfully",
        data: deleteUser.userId,
      };
    } catch (error) {
      console.log(error);

      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
      });
    }
  }),
});
