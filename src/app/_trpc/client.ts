import { AppRouter } from "@/server/index";
import { createTRPCReact } from "@trpc/react-query";

export const client = createTRPCReact<AppRouter>({});
