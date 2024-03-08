import { db } from "@/lib/db";
import { combinedProcedure, router } from "../trpc";
import { getUserById } from "@/lib/helpers";
import { TRPCError } from "@trpc/server";

export const alertLogRouter = router({
  getAlertLogs: combinedProcedure.query(async ({ ctx }) => {
    try {
      const { userId } = ctx;

      const user = await getUserById(userId);

      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You must be logged in and authorized to view the data",
        });
      }

      if (user.role === "SUPER_ADMIN") {
        const alertLogs = await db.alertlogs.findMany();

        return alertLogs;
      } else {
        const filteredalertLogs = await db.alertlogs.findMany({
          where: {
            organizationId: user.organizationId,
          },
        });

        return filteredalertLogs;
      }
    } catch (error) {
      console.log(error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
      });
    }
  }),
});
