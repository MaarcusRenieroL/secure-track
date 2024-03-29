import { getUserById } from "@/lib/helpers";
import { adminProcedure, privateProcedure, router } from "../trpc";
import { TRPCError } from "@trpc/server";
import { db } from "@/lib/db";
import { stopSchema, updateStopSchema } from "@/lib/zod-schema";
import * as z from "zod";

export const stopRouter = router({
  getStops: privateProcedure.query(async ({ ctx }) => {
    try {
      const { userId } = ctx;

      const user = await getUserById(userId);

      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to make this request",
        });
      }

      if (user.role === "SUPER_ADMIN") {
        const stops = await db.stop.findMany();

        return stops;
      } else if (user.role === "CREW") {
        const stops = await db.stop.findMany({
          where: {
            organizationId: user.organizationId,
            routeId: user.routeId,
          },
        });

        return stops;
      } else {
        const stops = await db.stop.findMany({
          where: {
            organizationId: user.organizationId,
          },
        });

        return stops;
      }
    } catch (error) {
      console.log(error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
      });
    }
  }),
  addStop: adminProcedure.input(stopSchema).mutation(async ({ ctx, input }) => {
    try {
      const { userId } = ctx;
      const {
        stopName,
        passengerCount,
        pickupTime,
        dropTime,
        fleetNumber,
        routeName,
      } = input;

      const adminUser = await getUserById(userId);

      if (!adminUser) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User doesn't exist",
        });
      }

      const fleet = await db.fleet.findFirst({
        where: {
          fleetNumber: fleetNumber,
        },
      });

      if (!fleet) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Fleet doesn't exist",
        });
      }

      const route = await db.route.findFirst({
        where: {
          routeName: routeName,
        },
      });

      if (!route) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Route doesn't exist",
        });
      }

      const location = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${stopName}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
      ).then((response) => response.json());

      console.log(location.results[0].geometry.location.lat);

      const newStop = await db.stop.create({
        data: {
          stopName,
          passengerCount,
          lat: location.results[0].geometry.location.lat,
          lng: location.results[0].geometry.location.lng,
          pickupTime,
          dropTime,
          organizationId: adminUser.organizationId,
          routeId: route.routeId,
          fleetId: fleet.fleetId,
        },
      });

      return {
        success: true,
        status: 201,
        message: "Stop Added Successfully",
        data: newStop.stopName,
      };
    } catch (error) {
      console.log(error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
      });
    }
  }),
  updateStop: adminProcedure
    .input(updateStopSchema)
    .mutation(async ({ input }) => {
      try {
        const { stopName, passengerCount, pickupTime, dropTime } = input;

        const existingStop = await db.stop.findFirst({
          where: {
            stopName: stopName,
          },
        });

        if (!existingStop) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Stop doesn't exist",
          });
        }

        const updatedStop = await db.stop.update({
          where: {
            stopName: stopName,
          },
          data: {
            stopName,
            passengerCount,
            pickupTime,
            dropTime,
          },
        });

        return {
          success: true,
          status: 201,
          message: "Stop updated successfully",
          data: updatedStop.stopName,
        };
      } catch (error) {
        console.log(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),
  deleteStop: adminProcedure.input(z.string()).mutation(async ({ input }) => {
    try {
      const existingStop = await db.stop.findFirst({
        where: {
          stopId: input,
        },
      });

      if (!existingStop) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Stop doesn't exist",
        });
      }

      const deletedStop = await db.stop.delete({
        where: {
          stopId: input,
        },
      });

      return {
        success: true,
        status: 201,
        message: "Stop deleted successfully",
        data: deletedStop.stopName,
      };
    } catch (error) {
      console.log(error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
      });
    }
  }),
});
