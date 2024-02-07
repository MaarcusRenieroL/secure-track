import { DataTable } from "@/components/tanstack-react-table/data-table";
import { stopsColumns } from "@/lib/columns";
import { server } from "@/app/_trpc/server";
import AddStopModal from "@/app/_components/admin/add/stop-modal";

export const dynamic = "force-dynamic";

export default async function AdminStopsPage() {
  const stops = await server.stop.getStops();
  const fleets = (await server.fleet.getFleets()) || [];
  const routes = await server.route.getRoutes();

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Stops Management Page </h1>
        <AddStopModal fleets={fleets} routes={routes} />
      </div>
      <div className="mt-10">
        <DataTable
          columns={stopsColumns}
          data={stops}
          placeholder="Search Stop Name"
          searchColumnName="stopName"
        />
      </div>
    </>
  );
}
