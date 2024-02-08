import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Pin } from "lucide-react";
import PassengerStatsCard from "../_components/passenger/dashboard/stats-card";
import MapSection from "../_components/admin/dashboard/map";

export default function PassengerDashboardPage() {
  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Passenger Dashboard
        </h2>
      </div>
      <PassengerStatsCard />
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
