import { server } from "@/app/_trpc/server";
import { DataTable } from "@/components/tanstack-react-table/data-table";
import { stopsColumns } from "@/lib/columns";

export const dynamic = "force-dynamic";

export default async function SuperAdminStopsPage() {
  const stops = await server.stop.getStops();

  return (
    <>
      <div className="flex items-center justify-center">
        <h1 className="text-2xl font-bold">Stops Management Page </h1>
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
