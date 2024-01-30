import { server } from "@/app/_trpc/server";
import { DataTable } from "@/components/tanstack-react-table/data-table";
import { passengerLogColumns } from "@/lib/columns";

export default async function AdminPassengerLogsPage() {

  const passengerLogs = await server.passengerLog.getPassengerLogs();

  return (
    <>
      <div className="flex items-center justify-center">
        <h1 className="text-center text-2xl font-bold">
          Passenger Logs Management Page
        </h1>
      </div>
      <div className="mt-10">
        <DataTable
          columns={passengerLogColumns}
          data={passengerLogs}
          placeholder="Search Passenger Name"
          searchColumnName="name"
        />
      </div>
    </>
  );
}
