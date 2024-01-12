import { DataTable } from "@/components/tanstack-react-table/data-table";
import { orgColumns, orgType } from "@/lib/columns";

export default function SuperAdminOrganizationsPage() {
  return (
    <>
      <div className="flex items-center justify-center">
        <h1 className="text-2xl font-bold">Organizations Management Page </h1>
      </div>
      <div className="mt-10">
        <DataTable
          columns={orgColumns}
          data={[]}
          placeholder="Search Organization Name"
          searchColumnName="orgName"
          facetedFilterColumn1="orgType"
          facetedFilterColumnOptions1={orgType}
        />
      </div>
    </>
  );
}
