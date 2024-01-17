import { fleetFormSchema } from "@/lib/zod-schema";
import { adminProcedure, router } from "@/server/trpc";
import { getUserById } from "@/lib/helpers";
import { db } from "@/lib/db";
import { TRPCError } from "@trpc/server";

export const fleetRouter = router({
  addFleet: adminProcedure.input(fleetFormSchema).mutation(async ({ ctx, input }) => {
    try {
      const { userId } = ctx;
      const { fleetNumber, regNumber, make, model, year, type, color, status, fcExpDate, capacity, ac } = input;

      const adminUser = await getUserById(userId);

      const existingFleet = await db.fleet.findFirst({
        where: {
          fleetNumber: fleetNumber,
        }
      })
      if (!existingFleet) {
        const addNewFleet = await db.fleet.create({
          data: { fleetNumber, regNumber, make, model, year: year, type, color, status, fcExpDate, capacity: capacity, ac, organizationId: adminUser?.organizationId },
        });
        return {
          success: true,
          status: 201,
          message: "Fleet Added Successfully",
          data: addNewFleet.fleetNumber,
        };
      } else {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Fleet already exists"
        })
      }
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
      });
    }
  }),
})
