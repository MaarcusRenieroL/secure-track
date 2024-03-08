import { server } from "@/app/_trpc/server";
import { DataTable } from "@/components/tanstack-react-table/data-table";
import { alertLogColumns } from "@/lib/columns";

export const dynamic = "force-dynamic";

export default async function AdminAlertLogsPage() {
  const alertLogs = await server.alertLog.getAlertLogs();

  return (
    <>
      <div className="flex items-center justify-center">
        <h1 className="text-center text-2xl font-bold">
          Alert Logs Management Page
        </h1>
      </div>
      <div className="mt-10">
        <DataTable columns={alertLogColumns} data={alertLogs} />
      </div>
    </>
  );
}
