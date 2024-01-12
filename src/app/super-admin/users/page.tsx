import { DataTable } from "@/components/tanstack-react-table/data-table";
import { userColumns, userType } from "@/lib/columns";

export default async function SuperAdminUsersPage() {

  return (
    <>
      <div className="flex items-center justify-center">
        <h1 className="text-2xl font-bold">Users Management Page </h1>
      </div>
      <div className="mt-10">
        <DataTable
          columns={userColumns}
          data={[]}
          placeholder="Search Email"
          searchColumnName="email"
          facetedFilterColumn1="role"
          facetedFilterColumnOptions1={userType}
        />
      </div>
    </>
  );
}
