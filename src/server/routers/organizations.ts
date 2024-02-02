import { TRPCError } from "@trpc/server";
import { router, superAdminProcedure } from "../trpc";
import { getUserById } from "@/lib/helpers";
import { db } from "@/lib/db";
import { z } from "zod";

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
  deleteOrganization: superAdminProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      try {
        const existingOrganization = await db.organization.findFirst({
          where: {
            organizationId: input,
          },
        });

        if (!existingOrganization) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Organization not found",
          });
        }

        const deletedOrganization = await db.organization.delete({
          where: {
            organizationId: input,
          },
        });

        return {
          success: true,
          status: 201,
          message: "Organization deleted successfully",
          data: deletedOrganization.orgName,
        };
      } catch (error) {
        console.log(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),
});
