import { server } from "@/app/_trpc/server";
import { DataTable } from "@/components/tanstack-react-table/data-table";
import { trackingLogColumns } from "@/lib/columns";

export default async function SuperAdminTrackingLogsPage() {

  const trackingLogs = await server.trackingLog.getTrackingLogs();

  return (
    <>
      <div className="flex items-center justify-center">
        <h1 className="text-2xl font-bold">Tracking Logs Management Page </h1>
      </div>
      <div className="mt-10">
        <DataTable
          columns={trackingLogColumns}
          data={trackingLogs}
          placeholder="Search GPS Device Id"
          searchColumnName="gpsDeviceId"
        />
      </div>
    </>
  );
}
