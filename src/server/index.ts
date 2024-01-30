import { inferReactQueryProcedureOptions } from "@trpc/react-query";
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

import { router } from "@/server/trpc";
import { userRouter } from "@/server/routers/users";
import { fleetRouter } from "./routers/fleets";
import { routeRouter } from "./routers/routes";
import { stopRouter } from "./routers/stops";
import { trackingLogRouter } from "./routers/tracking-logs";
import { passengerLogRouter } from "./routers/passenger-logs";

export const appRouter = router({
	user: userRouter,
  fleet: fleetRouter,
  route: routeRouter,
  stop: stopRouter,
  trackingLog: trackingLogRouter,
  passengerLog: passengerLogRouter,
});

export type AppRouter = typeof appRouter;
export type ReactQueryOptions = inferReactQueryProcedureOptions<AppRouter>;
export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;
