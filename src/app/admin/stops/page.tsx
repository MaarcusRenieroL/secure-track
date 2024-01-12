import { DataTable } from "@/components/tanstack-react-table/data-table";
import { stopsColumns } from "@/lib/columns";
import { Button } from "@/components/ui/button";

export default function AdminStopsPage() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Stops Management Page </h1>
        <Button>
          Add New Stop
        </Button>
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
