import { appRouter } from "@/server";
import { httpBatchLink } from "@trpc/client";
const url = "http://localhost:3000/api/trpc";
// @ts-ignore
export const server = appRouter.createCaller({
  // @ts-ignore
  links: [
    httpBatchLink({
      url,
    }),
  ],
});
