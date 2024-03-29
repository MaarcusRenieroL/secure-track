"use client";

import { client } from "@/app/_trpc/client";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink, loggerLink } from "@trpc/client";
import { FC, ReactNode, useState } from "react";
import { SessionProvider } from "next-auth/react";
import superjson from "superjson";


interface LayoutProps {
  children: ReactNode;
}

const Providers = ({ children }: LayoutProps) => {
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
    client.createClient({
      transformer: superjson,
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NEXT_PUBLIC_NODE_ENV === "development" ||
            (opts.direction === "down" && opts.result instanceof Error),
        }),
        httpBatchLink({
          url: "/api/trpc",
          AbortController: typeof window !== 'undefined' ? window.AbortController : undefined,
        }),
      ],

    })
  )

  return (
    <client.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <SessionProvider refetchWhenOffline={false}>
          {children}
        </SessionProvider>
      </QueryClientProvider>
    </client.Provider>
  )
};

export default Providers;
