import { DataTable } from "@/components/tanstack-react-table/data-table";
import { fleetColumns, fleetType } from "@/lib/columns";
import { Button } from "@/components/ui/button";

export default function AdminFleetsPage() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Fleet Management Page </h1>
        <Button>
          Add New Fleet
          </Button>
      </div>
      <div className="mt-10">
        <DataTable
          columns={fleetColumns}
          data={[]}
          placeholder="Search Fleet Number"
          searchColumnName="fleetNumber"
          facetedFilterColumn1="type"
          facetedFilterColumnOptions1={fleetType}
        />
      </div>
    </>
  );
}
