import { DataTable } from "@/components/tanstack-react-table/data-table";
import { passengerStopColumns } from "@/lib/columns";

export default function SuperAdminRoutesPage() {
  return (
    <>
      <div className="flex items-center justify-center">
        <h1 className="text-2xl font-bold">Stops Management Page </h1>
      </div>
      <div className="mt-10">
        <DataTable
          columns={passengerStopColumns}
          data={[]}
          placeholder="Search Stop Name"
          searchColumnName="stopName"
        />
      </div>
    </>
  );
}
