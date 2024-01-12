import { DataTable } from "@/components/tanstack-react-table/data-table";
import { passengerLogColumns } from "@/lib/columns";

export default async function SuperAdminOrganizationsPage() {
  return (
    <>
      <div className="flex items-center justify-center">
        <h1 className="text-2xl font-bold">Passenger Logs Management Page </h1>
      </div>
      <div className="mt-10">
        <DataTable
          columns={passengerLogColumns}
          data={[]}
          placeholder="Search Passenger Name"
          searchColumnName="name"
        />
      </div>
    </>
  );
}
