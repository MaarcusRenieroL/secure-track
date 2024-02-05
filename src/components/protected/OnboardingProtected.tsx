"use client"


import { redirect, usePathname } from "next/navigation";

import { useSession } from "next-auth/react"
import { useLayoutEffect } from "react"
export function OnboardingProtected() {
  const { data: session, } = useSession();
  const pathname = usePathname()

  useLayoutEffect(() => {
    const user = session?.user
    if (user && !user.isOnboarded && pathname !== "/onboarding") {
      redirect("/onboarding");
    }
  }, [session?.user])

  return <></>;
}

