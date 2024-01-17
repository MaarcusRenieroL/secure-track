import { DataTable } from "@/components/tanstack-react-table/data-table";
import { fleetColumns, fleetType } from "@/lib/columns";
import AddFleetModal from "@/app/_components/admin/add/fleet-modal";

export default function AdminFleetsPage() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Fleet Management Page </h1>
        <AddFleetModal />
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
