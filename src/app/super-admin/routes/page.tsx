import { DataTable } from "@/components/tanstack-react-table/data-table";
import { routeColumns } from "@/lib/columns";

export default function SuperAdminRoutesPage() {
  return (
    <>
      <div className="flex items-center justify-center">
        <h1 className="text-2xl font-bold">Fleets Management Page </h1>
      </div>
      <div className="mt-10">
        <DataTable
          columns={routeColumns}
          data={[]}
          placeholder="Search Route Name"
          searchColumnName="routeName"
        />
      </div>
    </>
  );
}
