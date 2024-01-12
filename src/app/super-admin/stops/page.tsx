import { DataTable } from "@/components/tanstack-react-table/data-table";
import { stopsColumns } from "@/lib/columns";

export default async function SuperAdminRoutesPage() {
  
  return (
    <>
      <div className="flex items-center justify-center">
        <h1 className="text-2xl font-bold">Stops Management Page </h1>
      </div>
      <div className="mt-10">
        <DataTable
          columns={stopsColumns}
          data={[]}
          placeholder="Search Stop Name"
          searchColumnName="stopName"
        />
      </div>
    </>
  );
}
