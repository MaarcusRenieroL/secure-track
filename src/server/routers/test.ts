import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const testRouter = router({
    getTest: publicProcedure.query(async ({})=>{

        return "hello world"
    }),
    addTest: publicProcedure.input(z.string()).mutation(async ({input})=>{
        return input
    })
})