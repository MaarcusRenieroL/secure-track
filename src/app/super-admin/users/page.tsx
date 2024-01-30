import { server } from "@/app/_trpc/server";
import { DataTable } from "@/components/tanstack-react-table/data-table";
import { userColumns, userType } from "@/lib/columns";

export default async function SuperAdminUsersPage() {

  const users = await server.user.getUsers();

  return (
    <>
      <div className="flex items-center justify-center">
        <h1 className="text-2xl font-bold">Users Management Page </h1>
      </div>
      <div className="mt-10">
        <DataTable
          columns={userColumns}
          data={users}
          placeholder="Search Email"
          searchColumnName="email"
          facetedFilterColumn1="role"
          facetedFilterColumnOptions1={userType}
        />
      </div>
    </>
  );
}
