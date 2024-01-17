import { appRouter } from "@/server";
import { httpBatchLink } from "@trpc/client";
const url = "http://localhost:3000/api/trpc"
export const server = appRouter.createCaller({
  links: [
    httpBatchLink({
      url,
    })
  ]
})
