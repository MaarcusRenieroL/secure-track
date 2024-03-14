import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Pin } from "lucide-react";
import PassengerStatsCard from "../_components/passenger/dashboard/stats-card";
import MapSection from "../_components/admin/dashboard/map";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { Fleet, Crew } from "@prisma/client";

export default async function PassengerDashboardPage() {
  const session = await getServerSession(authOptions);
  const crew = await db.user.findFirst({
    where: {
      routeId: session?.user.routeId,
      role: "CREW",
    },
  });
  const crewDetails = (await db.crew.findFirst({
    where: {
      email: crew?.email,
    },
  })) as Crew;
  const route = await db.route.findFirst({
    where: {
      routeId: crew?.routeId ?? "",
    },
  });
  const fleet = (await db.fleet.findFirst({
    where: {
      route: route,
    },
  })) as Fleet;
  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Passenger Dashboard
        </h2>
      </div>
      <PassengerStatsCard fleet={fleet} crewDetails={crewDetails} />
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">Live Tracking</CardTitle>
          <Pin className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <MapSection />
        </CardContent>
      </Card>
    </div>
  );
}
