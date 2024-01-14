import { DataTable } from "@/components/tanstack-react-table/data-table";
import { fleetType, passengerFleetColumns, statusType } from "@/lib/columns";

export default function PassengerFleetsPage() {
  return (
    <>
      <div className="flex items-center justify-center">
        <h1 className="text-2xl font-bold">Fleet Management Page </h1>
      </div>
      <div className="mt-10">
        <DataTable
          columns={passengerFleetColumns}
          data={[]}
          placeholder="Search Registration Number"
          searchColumnName="regNumber"
          facetedFilterColumn1="type"
          facetedFilterColumnOptions1={fleetType}
          facetedFilterColumn2="status"
          facetedFilterColumnOptions2={statusType}
        />
      </div>
    </>
  );
}
