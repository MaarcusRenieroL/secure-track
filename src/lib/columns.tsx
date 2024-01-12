"use client";

import type { Organization, Fleet } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash } from "lucide-react";
import { DataTableColumnHeader } from "@/components/tanstack-react-table/data-table-column-header";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

type filterType = {
  label: string;
  value: string;
}[];

export const orgType: filterType = [
  { label: "SCHOOL", value: "SCHOOL" },
  { label: "COLLEGE", value: "COLLEGE" },
  { label: "COMPANY", value: "COMPANY" },
];

export const orgColumns: ColumnDef<Organization>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "uniqueId",
    cell: ({ row }) => (
      <div className="min-w-max">{row.getValue("uniqueId")}</div>
    ),
    accessorKey: "id",
    enableHiding: true,
  },
  {
    id: "orgName",
    header: ({ column }) => (
      <div>
        <DataTableColumnHeader column={column} title="Organization Name" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="min-w-max">{row.getValue("orgName")}</div>
    ),
    accessorKey: "orgName",
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "orgType",
    header: ({ column }) => (
      <div>
        <DataTableColumnHeader column={column} title="Organization Type" />
      </div>
    ),
    cell: ({ row }) => {
      const type = orgType.find(
        (type) => type.value === row.getValue("orgType"),
      );

      if (!type) {
        return null;
      }

      return (
        <div className="min-w-max">
          <span>{type.label}</span>
        </div>
      );
    },
    filterFn: (row, id: string, value: Array<string>) => {
      return value.includes(row.getValue(id)) as boolean;
    },
    accessorKey: "orgType",
  },
  {
    id: "fleetsCount",
    header: ({ column }) => (
      <div>
        <DataTableColumnHeader column={column} title="Fleets Count" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="min-w-max">{row.getValue("fleetsCount")}</div>
    ),
    accessorKey: "fleetsCount",
  },
  {
    id: "routesCount",
    header: ({ column }) => (
      <div>
        <DataTableColumnHeader column={column} title="Routes Count" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="min-w-max">{row.getValue("routesCount")}</div>
    ),
    accessorKey: "routesCount",
  },
  {
    id: "crewsCount",
    header: ({ column }) => (
      <div>
        <DataTableColumnHeader column={column} title="Crews Count" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="min-w-max">{row.getValue("crewsCount")}</div>
    ),
    accessorKey: "crewsCount",
  },
  {
    id: "passengersCount",
    header: ({ column }) => (
      <div>
        <DataTableColumnHeader column={column} title="Passenger Count" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="min-w-max">{row.getValue("passengersCount")}</div>
    ),
    accessorKey: "passengersCount",
  },
  {
    id: "adminName",
    header: ({ column }) => (
      <div>
        <DataTableColumnHeader column={column} title="Administrator Name" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="min-w-max">{row.getValue("adminName")}</div>
    ),
    accessorKey: "adminName",
  },
  {
    id: "adminEmail",
    header: ({ column }) => (
      <div>
        <DataTableColumnHeader column={column} title="Administrator Email ID" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="min-w-max">{row.getValue("adminEmail")}</div>
    ),
    accessorKey: "adminEmail",
  },
  {
    id: "adminPhoneNumber",
    header: ({ column }) => (
      <div>
        <DataTableColumnHeader column={column} title="Admin Phone Number" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="min-w-max">{row.getValue("adminPhoneNumber")}</div>
    ),
    accessorKey: "adminPhoneNumber",
  },
  {
    id: "altAdminPhoneNumber",
    header: ({ column }) => (
      <div>
        <DataTableColumnHeader
          column={column}
          title="Alternative Admin Phone Number"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="min-w-max">{row.getValue("altAdminPhoneNumber")}</div>
    ),
    accessorKey: "altAdminPhoneNumber",
  },
  {
    id: "addressLine1",
    header: ({ column }) => (
      <div>
        <DataTableColumnHeader column={column} title="Address Line 1" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="min-w-max">{row.getValue("addressLine1")}</div>
    ),
    accessorKey: "addressLine1",
  },
  {
    id: "addressLine2",
    header: ({ column }) => (
      <div>
        <DataTableColumnHeader column={column} title="Address Line 2" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="min-w-max">{row.getValue("addressLine2")}</div>
    ),
    accessorKey: "addressLine2",
  },
  {
    id: "addressLine3",
    header: ({ column }) => (
      <div>
        <DataTableColumnHeader column={column} title="Address Line 3" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="min-w-max">{row.getValue("addressLine3")}</div>
    ),
    accessorKey: "addressLine3",
  },
  {
    id: "state",
    header: ({ column }) => (
      <div>
        <DataTableColumnHeader column={column} title="State" />
      </div>
    ),
    cell: ({ row }) => <div className="min-w-max">{row.getValue("state")}</div>,
    accessorKey: "state",
  },
  {
    id: "city",
    header: ({ column }) => (
      <div>
        <DataTableColumnHeader column={column} title="City" />
      </div>
    ),
    cell: ({ row }) => <div className="min-w-max">{row.getValue("city")}</div>,
    accessorKey: "city",
  },
  {
    id: "pincode",
    header: ({ column }) => (
      <div>
        <DataTableColumnHeader column={column} title="Pincode" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="min-w-max">{row.getValue("pincode")}</div>
    ),
    accessorKey: "pincode",
  },
  {
    id: "actions",
    header: () => (
      <div className="flex min-w-max items-center justify-center">Actions</div>
    ),
    cell: () => (
      <div className="min-w-max space-x-2">
        <Button variant="outline" size="icon">
          <Edit className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon">
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    ),
  },
];

export const statusType: filterType = [
  { label: "ACTIVE", value: "ACTIVE" },
  { label: "INACTIVE", value: "INACTIVE" },
  { label: "MAINTANENCE", value: "MAINTANENCE" },
  { label: "IDLE", value: "IDLE" },
];

export const fleetType: filterType = [
  { label: "BUS", value: "BUS" },
  { label: "MINI_BUS", value: "MINI_BUS" },
  { label: "VAN", value: "VAN" },
];

export const fleetColumns: ColumnDef<Fleet>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "uniqueId",
    cell: ({ row }) => (
      <div className="min-w-max">{row.getValue("uniqueId")}</div>
    ),
    accessorKey: "id",
    enableHiding: true,
  },
  {
    id: "fleetNumber",
    header: ({ column }) => (
      <div>
        <DataTableColumnHeader column={column} title="Fleet Number" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="min-w-max">{row.getValue("fleetNumber")}</div>
    ),
    accessorKey: "fleetNumber",
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "regNumber",
    header: ({ column }) => (
      <div>
        <DataTableColumnHeader column={column} title="Registration Number" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="min-w-max">{row.getValue("regNumber")}</div>
    ),
    accessorKey: "regNumber",
  },
  {
    id: "make",
    header: ({ column }) => (
      <div>
        <DataTableColumnHeader column={column} title="Make" />
      </div>
    ),
    cell: ({ row }) => <div className="min-w-max">{row.getValue("make")}</div>,
    accessorKey: "make",
  },
  {
    id: "model",
    header: ({ column }) => (
      <div>
        <DataTableColumnHeader column={column} title="Model" />
      </div>
    ),
    cell: ({ row }) => <div className="min-w-max">{row.getValue("model")}</div>,
    accessorKey: "model",
  },
  {
    id: "year",
    header: ({ column }) => (
      <div>
        <DataTableColumnHeader column={column} title="Year" />
      </div>
    ),
    cell: ({ row }) => <div className="min-w-max">{row.getValue("year")}</div>,
    accessorKey: "year",
  },
  {
    id: "type",
    header: ({ column }) => (
      <div>
        <DataTableColumnHeader column={column} title="Type" />
      </div>
    ),
    cell: ({ row }) => {
      const type = fleetType.find(
        (type) => type.value === row.getValue("type"),
      );

      if (!type) {
        return null;
      }

      return (
        <div className="min-w-max">
          <span>{type.label}</span>
        </div>
      );
    },
    filterFn: (row, id: string, value: Array<string>) => {
      return value.includes(row.getValue(id)) as boolean;
    },
    accessorKey: "type",
  },
  {
    id: "color",
    header: ({ column }) => (
      <div>
        <DataTableColumnHeader column={column} title="Color" />
      </div>
    ),
    cell: ({ row }) => <div className="min-w-max">{row.getValue("color")}</div>,
    accessorKey: "color",
  },
  {
    id: "status",
    header: ({ column }) => (
      <div>
        <DataTableColumnHeader column={column} title="Status" />
      </div>
    ),
    cell: ({ row }) => {
      const type = statusType.find(
        (type) => type.value === row.getValue("status"),
      );

      if (!type) {
        return null;
      }

      return (
        <div className="min-w-max">
          <span>{type.label}</span>
        </div>
      );
    },
    filterFn: (row, id: string, value: Array<string>) => {
      return value.includes(row.getValue(id)) as boolean;
    },
    accessorKey: "status",
  },
  {
    id: "fcExpDate",
    header: ({ column }) => (
      <div>
        <DataTableColumnHeader column={column} title="FC Expiry Date" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="min-w-max">
        {new Date(row.getValue("fcExpDate")).toDateString()}
      </div>
    ),
    accessorKey: "fcExpDate",
  },
  {
    id: "capacity",
    header: ({ column }) => (
      <div>
        <DataTableColumnHeader column={column} title="Capacity" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="min-w-max">{row.getValue("capacity")}</div>
    ),
    accessorKey: "capacity",
  },
  {
    id: "ac",
    header: ({ column }) => (
      <div>
        <DataTableColumnHeader column={column} title="AC" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="min-w-max">{JSON.stringify(row.getValue("ac"))}</div>
    ),
    accessorKey: "ac",
  },
  {
    id: "actions",
    header: () => (
      <div className="flex min-w-max items-center justify-center">Actions</div>
    ),
    cell: () => (
      <div className="min-w-max space-x-2">
        <Button variant="outline" size="icon">
          <Edit className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon">
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    ),
  },
];

