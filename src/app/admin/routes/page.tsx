import { DataTable } from "@/components/tanstack-react-table/data-table";
import { routeColumns } from "@/lib/columns";
import { db } from "@/lib/db";
import AddRouteModal from "@/app/_components/admin/add/route-modal";
import { server } from "@/app/_trpc/server";

export const dynamic = "force-dynamic";

export default async function AdminRoutesPage() {
  const fleets = await db.fleet.findMany();
  const users = await db.user.findMany();
  const routes = await server.route.getRoutes();
  const stops = await server.stop.getStops();
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Routes Management Page </h1>
        <AddRouteModal users={users} fleets={fleets} stops={stops} />
      </div>
      <div className="mt-10">
        <DataTable
          columns={routeColumns}
          data={routes}
          placeholder="Search Route Number"
          searchColumnName="routeName"
        />
      </div>
    </>
  );
}
