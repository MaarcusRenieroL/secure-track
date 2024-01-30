import { getUserById } from "@/lib/helpers";
import { privateProcedure, router } from "../trpc";
import { TRPCError } from "@trpc/server";
import { db } from "@/lib/db";

export const stopRouter = router({
  getStops: privateProcedure.query(async ({ ctx }) => {
    try {
      const { userId } = ctx;

      const user = await getUserById(userId);

      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to make this request"
        });
      }

      if (user.role === "SUPER_ADMIN") {
        const stops = await db.stop.findMany();

        return stops;
      } else {
        const stops = await db.stop.findMany({
          where: {
            organizationId: user.organizationId,
          }
        });

        return stops;
      }

    } catch (error) {
      console.log(error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR"
      })
    }
  })
})
