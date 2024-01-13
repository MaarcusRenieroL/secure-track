import { DataTable } from "@/components/tanstack-react-table/data-table";
import { trackingLogColumns } from "@/lib/columns";

export default function AdminTrackingLogsPage() {
  return (
    <>
      <div className="flex items-center justify-center">
        <h1 className="text-2xl font-bold">Tracking Logs Management Page </h1>
      </div>
      <div className="mt-10">
        <DataTable
          columns={trackingLogColumns}
          data={[]}
          placeholder="Search GPS Device Id"
          searchColumnName="gpsDeviceId"
        />
      </div>
    </>
  );
}
