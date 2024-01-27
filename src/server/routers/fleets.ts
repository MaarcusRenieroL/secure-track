import { fleetFormSchema, updateFleetFormSchema } from "@/lib/zod-schema";
import { adminProcedure, combinedProcedure, router } from "@/server/trpc";
import { getUserById } from "@/lib/helpers";
import { db } from "@/lib/db";
import { TRPCError } from "@trpc/server";
import * as z from "zod";

export const fleetRouter = router({
  getFleets: combinedProcedure.query(async ({ ctx }) => {
    try {
      const { userId } = ctx;

      const user = await getUserById(userId);

      if (user?.role === "ADMIN") {
        const fleets = await db.fleet.findMany({
          where: {
            organizationId: user.organizationId,
          }
        })

        return fleets;
      } else {
        const fleets = await db.fleet.findMany();

        return fleets;
      }

    } catch (error) {
      console.log(error);

    }
  }),
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
  updateFleet: adminProcedure.input(updateFleetFormSchema).mutation(async ({ input }) => {
    try {
      const { fleetNumber, fcExpDate } = input;


      const existingFleet = await db.fleet.findFirst({
        where: {
          fleetNumber: fleetNumber,
        }
      })
      if (existingFleet) {
        const updateFleet = await db.fleet.update({
          where: {
            fleetNumber: fleetNumber
          },
          data: { fcExpDate: fcExpDate },
        });
        return {
          success: true,
          status: 201,
          message: "Fleet updated Successfully",
          data: updateFleet.fleetNumber,
        };
      } else {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Fleet doesn't exists"
        })
      }
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
      });
    }
  }),
  deleteFleet: adminProcedure.input(z.string()).mutation(async ({ input }) => {
    try {
      const fleet = await db.fleet.findFirst({
        where: {
          id: input,
        }
      });

      if (!fleet) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Fleet doesn't exists"
        })
      }

      const deletedFleet = await db.fleet.delete({
        where: {
          id: input,
        }
      })

      return {
        success: true,
        status: 201,
        message: "Fleet updated Successfully",
        data: deletedFleet.fleetNumber,
      };

    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
      });
    }
  })
})
