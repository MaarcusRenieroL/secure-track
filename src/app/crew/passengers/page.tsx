import { server } from "@/app/_trpc/server";
import { DataTable } from "@/components/tanstack-react-table/data-table";
import { crewPassengerColumns } from "@/lib/columns";

export const dynamic = "force-dynamic";

export default async function CrewStopsPage() {
  const stops = await server.stop.getPassengersFromStop();

  return (
    <>
      <div className="flex items-center justify-center">
        <h1 className="text-2xl font-bold">Stops Management Page </h1>
      </div>
      <div className="mt-10">
        <DataTable
          columns={crewPassengerColumns}
          data={stops}
          placeholder="Search Passenger name"
          searchColumnName="firstName"
        />
      </div>
    </>
  );
}
