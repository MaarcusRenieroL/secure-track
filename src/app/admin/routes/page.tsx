import { DataTable } from "@/components/tanstack-react-table/data-table";
import { routeColumns } from "@/lib/columns";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import AddRouteModal from "@/app/_components/admin/add/route-modal";

export default async function AdminRoutesPage() {
  const fleets = await db.fleet.findMany();
  const users = await db.user.findMany();
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Routes Management Page </h1>
        <AddRouteModal users={users} fleets={fleets} />
      </div>
      <div className="mt-10">
        <DataTable
          columns={routeColumns}
          data={[]}
          placeholder="Search Route Number"
          searchColumnName="routeName"
        />
      </div>
    </>
  );
}
