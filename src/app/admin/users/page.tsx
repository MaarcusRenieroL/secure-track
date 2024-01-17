import { DataTable } from "@/components/tanstack-react-table/data-table";
import { userColumns, userType } from "@/lib/columns";
import AddNewUserModal from "@/app/_components/admin/add/user-modal";
import { server } from "@/app/_trpc/server";

export default async function AdminUsersPage() {
  const users = await server.user.getUsers();
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Users Management Page </h1>
        <AddNewUserModal />
      </div>
      <div className="mt-10">
        <DataTable
          columns={userColumns}
          data={users}
          placeholder="Search Email Id"
          searchColumnName="email"
          facetedFilterColumn1="role"
          facetedFilterColumnOptions1={userType}
        />
      </div>
    </>
  );
}
