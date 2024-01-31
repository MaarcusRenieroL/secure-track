import { routeSchema, updateRouteSchema } from "@/lib/zod-schema";
import { adminProcedure, combinedProcedure, router } from "../trpc";
import { getUserById } from "@/lib/helpers";
import { db } from "@/lib/db";
import { TRPCError } from "@trpc/server";
import * as z from "zod";

export const routeRouter = router({
  getRoutes: combinedProcedure.query(async ({ ctx }) => {
    try {
      const { userId } = ctx;

      const user = await getUserById(userId);

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User doesn't exist",
        });
      }

      if (user.role === "SUPER_ADMIN") {
        const routes = await db.route.findMany({
          include: {
            stops: true
          }
        });

        return routes;
      } else {
        const routes = await db.route.findMany({
          where: {
            organizationId: user.organizationId,
          }, include: {
            stops: true
          }
        });

        return routes;
      }

    } catch (error) {

      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
      });

    }
  }),
  addRoute: adminProcedure.input(routeSchema).mutation(async ({ ctx, input }) => {
    try {
      const { userId } = ctx;
      const { routeName, stops, passengerCount, startTime, endTime, startPoint, distance, duration, driverName, fleetNumber } = input;

      const adminUser = await getUserById(userId);

      const driverUser = await db.user.findFirst({
        where: {
          name: driverName,
        }
      })

      if (!driverUser) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Driver not found",
        })
      }

      const fleet = await db.fleet.findFirst({
        where: {
          fleetNumber: fleetNumber,
        }
      })

      if (!fleet) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Fleet not found",
        })
      }

      const existingRoute = await db.route.findFirst({
        where: {
          routeName: routeName,
        }
      })
      if (!existingRoute) {
        const addNewRoute = await db.route.create({
          data: {
            routeName, passengerCount, startTime, endTime, startPoint, distance, duration, userId: driverUser.userId, organizationId: adminUser?.userId, fleetId: fleet?.fleetId,
            stops: {
              connect: stops.map(stop => ({ stopId: stop }))
            },
          }
        });
        return {
          success: true,
          status: 201,
          message: "Fleet Added Successfully",
          data: addNewRoute.routeName,
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
  updateRoute: adminProcedure.input(updateRouteSchema).mutation(async ({ input }) => {
    try {
      const { routeName, stops, passengerCount, startTime, endTime, startPoint, distance, duration } = input;

      const existingRoute = await db.route.findFirst({
        where: {
          routeName: routeName,
        }
      });

      if (!existingRoute) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Route not found",
        });
      }

      const updatedRoute = await db.route.update({
        where: {
          routeName: routeName,
        }, data: {
          passengerCount, startTime, endTime, startPoint, distance, duration,
          stops: {
            connect: stops.map(stop => ({ stopId: stop }))
          },
        }
      })

      return {
        success: true,
        status: 201,
        message: "Fleet updated successfully",
        data: updatedRoute.routeName,
      };

    } catch (error) {

    }
  }),
  deleteRoute: adminProcedure.input(z.string()).mutation(async ({ input }) => {
    try {
      const existingRoute = await db.route.findFirst({
        where: {
          routeId: input,
        }
      });

      if (!existingRoute) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Route not found",
        });
      }

      const deletedRoute = await db.route.delete({
        where: {
          routeId: input,
        }
      });

      return {

        success: true,
        status: 201,
        message: "Fleet updated Successfully",
        data: deletedRoute.routeId,
      }
    } catch (error) {
      console.log(error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR"
      })

    }
  })
})
