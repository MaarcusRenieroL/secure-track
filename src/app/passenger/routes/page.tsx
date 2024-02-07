import { server } from "@/app/_trpc/server";
import { DataTable } from "@/components/tanstack-react-table/data-table";
import { passengerRouteColumns } from "@/lib/columns";

export default async function PassengerRoutesPage() {
  const routes = await server.route.getRoutes();
  return (
    <>
      <div className="flex items-center justify-center">
        <h1 className="text-2xl font-bold">Routes Management Page </h1>
      </div>
      <div className="mt-10">
        <DataTable
          columns={passengerRouteColumns}
          data={routes}
          placeholder="Search Route Number"
          searchColumnName="routeNumber"
        />
      </div>
    </>
  );
}
