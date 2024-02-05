import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import AdminOnboarding from "../_components/onboarding/admin";
import PassengerOnboarding from "../_components/onboarding/passenger";
import { TRPCError } from "@trpc/server";

export default async function OnboardingPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Please login to fill the onboarding form",
    });
  }

  if (session.user.role === "ADMIN") {
    return <AdminOnboarding />;
  } else if (session.user.role === "PASSENGER") {
    return <PassengerOnboarding email={session.user.email || ""} />;
  }

  return (
    <div className="flex items-center justify-center h-screen w-screen">
      Unauthorized
    </div>
  );
}
