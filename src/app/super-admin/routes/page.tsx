import { server } from "@/app/_trpc/server";
import { DataTable } from "@/components/tanstack-react-table/data-table";
import { routeColumns } from "@/lib/columns";

export const dynamic = "force-dynamic";

export default async function SuperAdminRoutesPage() {
  const routes = await server.route.getRoutes();

  return (
    <>
      <div className="flex items-center justify-center">
        <h1 className="text-2xl font-bold">Routes Management Page </h1>
      </div>
      <div className="mt-10">
        <DataTable
          columns={routeColumns}
          data={routes}
          placeholder="Search Route Name"
          searchColumnName="routeName"
        />
      </div>
    </>
  );
}
