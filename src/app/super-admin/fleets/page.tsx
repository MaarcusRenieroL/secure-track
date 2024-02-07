import { server } from "@/app/_trpc/server";
import { DataTable } from "@/components/tanstack-react-table/data-table";
import { fleetType, fleetColumns } from "@/lib/columns";

export const dynamic = "force-dynamic";

export default async function SuperAdminFleetsPage() {
  const fleets = (await server.fleet.getFleets()) || [];

  return (
    <>
      <div className="flex items-center justify-center">
        <h1 className="text-2xl font-bold">Fleets Management Page </h1>
      </div>
      <div className="mt-10">
        <DataTable
          columns={fleetColumns}
          data={fleets}
          placeholder="Search Fleet Number"
          searchColumnName="fleetNumber"
          facetedFilterColumn1="type"
          facetedFilterColumnOptions1={fleetType}
        />
      </div>
    </>
  );
}
