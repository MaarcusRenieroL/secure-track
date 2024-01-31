import { TRPCError } from "@trpc/server";
import { router, superAdminProcedure } from "../trpc";
import { getUserById } from "@/lib/helpers";
import { db } from "@/lib/db";

export const organizationRouter = router({
  getOrganizations: superAdminProcedure.query(async ({ ctx }) => {
    try {
      const { userId } = ctx;

      const user = await getUserById(userId);

      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Please login to view the data",
        });
      }

      const organizations = await db.organization.findMany();

      return organizations;
    } catch (error) {
      console.log(error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
      });
    }
  }),
});
