import { DataTable } from "@/components/tanstack-react-table/data-table";
import { routeColumns } from "@/lib/columns";
import { Button } from "@/components/ui/button";

export default function AdminRoutesPage() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Routes Management Page </h1>
        <Button>
          Add New Route
        </Button>
      </div>
      <div className="mt-10">
        <DataTable
          columns={routeColumns}
          data={[]}
          placeholder="Search Route Number"
          searchColumnName="routeNumber"
        />
      </div>
    </>
  );
}
