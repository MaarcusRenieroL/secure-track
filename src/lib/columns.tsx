"use client";

import type { Organization, Fleet, Route, User, Stop, trackinglogs, passengerlogs, FleetType, FleetStatus } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash } from "lucide-react";
import { DataTableColumnHeader } from "@/components/tanstack-react-table/data-table-column-header";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DeleteUserModal } from "@/app/_components/admin/delete/user-modal";
import EditUserModal from "@/app/_components/admin/edit/user-modal";
import { EditFleetModal } from "@/app/_components/admin/edit/fleet-modal";
import { DeleteFleetModal } from "@/app/_components/admin/delete/fleet-modal";
import { DeleteRouteModal } from "@/app/_components/admin/delete/route-modal";
import EditRouteModal from "@/app/_components/admin/edit/route-modal";
import { DeleteStopModal } from "@/app/_components/admin/delete/stop-modal";

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
    cell: ({ row }) => (
      <div className="min-w-max space-x-2">
        <EditFleetModal fleetNumber={row.getValue("fleetNumber")} regNumber={row.getValue("regNumber")} make={row.getValue("make")} model={row.getValue("model")} year={row.getValue("year")} type={row.getValue("type") as FleetType} color={row.getValue("color")} status={row.getValue("status") as FleetStatus} capacity={row.getValue("capacity")} ac={row.getValue("ac")} fcExpDate={new Date(row.getValue("fcExpDate"))} />
        <DeleteFleetModal id={row.getValue("uniqueId")} />
      </div>
    ),
  },
];

export const routeColumns: ColumnDef<Route>[] = [
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
    accessorKey: "routeId",
    enableHiding: true,
  },
  {
    id: "routeName",
    header: ({ column }) => (
      <div>
        <DataTableColumnHeader column={column} title="Route Name" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="min-w-max">{row.getValue("routeName")}</div>
    ),
    accessorKey: "routeName",
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "stops",
    header: ({ column }) => (
      <div>
        <DataTableColumnHeader column={column} title="Stops" />
      </div>
    ),
    cell: ({ row }) => <div className="min-w-max">{row.getValue("stops")}</div>,
    accessorKey: "stops",
  },
  {
    id: "passengerCount",
    header: ({ column }) => (
      <div>
        <DataTableColumnHeader column={column} title="Passenger Count" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="min-w-max">{row.getValue("passengerCount")}</div>
    ),
    accessorKey: "passengerCount",
  },
  {
    id: "startTime",
    header: ({ column }) => (
      <div>
        <DataTableColumnHeader column={column} title="Start Time" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="min-w-max">{row.getValue("startTime")}</div>
    ),
    accessorKey: "startTime",
  },
  {
    id: "endTime",
    header: ({ column }) => (
      <div>
        <DataTableColumnHeader column={column} title="End Time" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="min-w-max">{row.getValue("endTime")}</div>
    ),
    accessorKey: "endTime",
  },
  {
    id: "startPoint",
    header: ({ column }) => (
      <div>
        <DataTableColumnHeader column={column} title="Start Point" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="min-w-max">{row.getValue("startPoint")}</div>
    ),
    accessorKey: "startPoint",
  },
  {
    id: "distance",
    header: ({ column }) => (
      <div>
        <DataTableColumnHeader column={column} title="Distance" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="min-w-max">{row.getValue("distance")}</div>
    ),
    accessorKey: "distance",
  },
  {
    id: "duration",
    header: ({ column }) => (
      <div>
        <DataTableColumnHeader column={column} title="Duration" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="min-w-max">{row.getValue("duration")}</div>
    ),
    accessorKey: "duration",
  },
  {
    id: "actions",
    header: () => (
      <div className="flex min-w-max items-center justify-center">Actions</div>
    ),
    cell: ({ row }) => (
      <div className="min-w-max space-x-2">
        <EditRouteModal routeName={row.getValue("routeName")} stops={row.getValue("stops")} passengerCount={row.getValue("passengerCount")} startTime={row.getValue("startTime")} endTime={row.getValue("endTime")} startPoint={row.getValue("startPoint")} distance={row.getValue("distance")} duration={row.getValue("duration")} />
        <DeleteRouteModal id={row.getValue("uniqueId")} />
      </div>
    ),
  },
];

export const userType: filterType = [
  { label: "SUPER_ADMIN", value: "SUPER_ADMIN" },
  { label: "ADMIN", value: "ADMIN" },
  { label: "CREW", value: "CREW" },
  { label: "PASSENGER", value: "PASSENGER" },
];

export const userColumns: ColumnDef<User>[] = [
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
      <div className="min-w-max">{row.getValue("userId")}</div>
    ),
    accessorKey: "userId",
    enableHiding: true,
  },
  {
    id: "email",
    header: ({ column }) => (
      <div>
        <DataTableColumnHeader column={column} title="Email ID" />
      </div>
    ),
    cell: ({ row }) => <div className="min-w-max">{row.getValue("email")}</div>,
    accessorKey: "email",
  },
  {
    id: "role",
    header: ({ column }) => (
      <div>
        <DataTableColumnHeader column={column} title="User Role" />
      </div>
    ),
    cell: ({ row }) => {
      const type = userType.find((type) => type.value === row.getValue("role"));

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
    accessorKey: "role",
  },
  {
    id: "isVerified",
    header: ({ column }) => (
      <div>
        <DataTableColumnHeader column={column} title="Is Verified" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="min-w-max">
        {JSON.stringify(row.getValue("isVerified"))}
      </div>
    ),
    accessorKey: "isVerified",
  },
  {
    id: "isOnboarded",
    header: ({ column }) => (
      <div>
        <DataTableColumnHeader column={column} title="Is Onboarded" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="min-w-max">
        {JSON.stringify(row.getValue("isOnboarded"))}
      </div>
    ),
    accessorKey: "isOnboarded",
  },
  {
    id: "actions",
    header: () => (
      <div className="flex min-w-max items-center justify-center">Actions</div>
    ),
    cell: ({ row }) => (
      <div className="min-w-max space-x-2">
        <EditUserModal id={row.getValue("uniqueId")} email={row.getValue("email")} role={row.getValue("role")} />
        <DeleteUserModal id={row.getValue("uniqueId")} />
      </div>
    ),
  },
];

export const stopsColumns: ColumnDef<Stop>[] = [
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
    accessorKey: "stopId",
    enableHiding: true,
  },
  {
    id: "stopName",
    header: ({ column }) => (
      <div>
        <DataTableColumnHeader column={column} title="Stop Name" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="min-w-max">{row.getValue("stopName")}</div>
    ),
    accessorKey: "stopName",
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "lat",
    header: ({ column }) => (
      <div>
        <DataTableColumnHeader column={column} title="Latitude" />
      </div>
    ),
    cell: ({ row }) => <div className="min-w-max">{row.getValue("lat")}</div>,
    accessorKey: "lat",
  },
  {
    id: "lng",
    header: ({ column }) => (
      <div>
        <DataTableColumnHeader column={column} title="Longitude" />
      </div>
    ),
    cell: ({ row }) => <div className="min-w-max">{row.getValue("lng")}</div>,
    accessorKey: "lng",
  },
  {
    id: "pickupTime",
    header: ({ column }) => (
      <div>
        <DataTableColumnHeader column={column} title="Pickup Time" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="min-w-max">{row.getValue("pickupTime")}</div>
    ),
    accessorKey: "pickupTime",
  },
  {
    id: "dropTime",
    header: ({ column }) => (
      <div>
        <DataTableColumnHeader column={column} title="Drop Time" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="min-w-max">{row.getValue("dropTime")}</div>
    ),
    accessorKey: "dropTime",
  },
  {
    id: "passengerCount",
    header: ({ column }) => (
      <div>
        <DataTableColumnHeader column={column} title="Passenger Count" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="min-w-max">{row.getValue("passengerCount")}</div>
    ),
    accessorKey: "passengerCount",
  },
  {
    id: "actions",
    header: () => (
      <div className="flex min-w-max items-center justify-center">Actions</div>
    ),
    cell: ({ row }) => (
      <div className="min-w-max space-x-2">
        <Button variant="outline" size="icon">
          <Edit className="h-4 w-4" />
        </Button>
        <DeleteStopModal id={row.getValue("uniqueId")} />
      </div>
    ),
  },
];

export const trackingLogColumns: ColumnDef<trackinglogs>[] = [
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
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "gpsDeviceId",
    header: ({ column }) => (
      <div>
        <DataTableColumnHeader column={column} title="GPS Device ID" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="min-w-max">{row.getValue("gpsDeviceId")}</div>
    ),
    accessorKey: "gpsDeviceId",
  },
  {
    id: "routeNumber",
    header: ({ column }) => (
      <div>
        <DataTableColumnHeader column={column} title="Route Number" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="min-w-max">{row.getValue("routeNumber")}</div>
    ),
    accessorKey: "routeNumber",
  },
  {
    id: "timeStamp",
    header: ({ column }) => (
      <div>
        <DataTableColumnHeader column={column} title="Time Stamp" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="min-w-max">
        {new Date(row.getValue("timeStamp")).toLocaleTimeString()}
      </div>
    ),
    accessorKey: "timeStamp",
  },
  {
    id: "latitude",
    header: ({ column }) => (
      <div>
        <DataTableColumnHeader column={column} title="Latitude" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="min-w-max">{row.getValue("latitude")}</div>
    ),
    accessorKey: "latitude",
  },
  {
    id: "longitude",
    header: ({ column }) => (
      <div>
        <DataTableColumnHeader column={column} title="Longitude" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="min-w-max">{row.getValue("longitude")}</div>
    ),
    accessorKey: "longitude",
  },
];

export const passengerLogColumns: ColumnDef<passengerlogs>[] = [
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
    id: "uid",
    header: ({ column }) => (
      <div>
        <DataTableColumnHeader column={column} title="UUID" />
      </div>
    ),
    cell: ({ row }) => <div className="min-w-max">{row.getValue("uid")}</div>,
    accessorKey: "uid",
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "name",
    header: ({ column }) => (
      <div>
        <DataTableColumnHeader column={column} title="Name" />
      </div>
    ),
    cell: ({ row }) => <div className="min-w-max">{row.getValue("name")}</div>,
    accessorKey: "name",
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
  },
  {
    id: "routeNumber",
    header: ({ column }) => (
      <div>
        <DataTableColumnHeader column={column} title="Route Number" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="min-w-max">{row.getValue("routeNumber")}</div>
    ),
    accessorKey: "routeNumber",
  },
  {
    id: "boardingPoint",
    header: ({ column }) => (
      <div>
        <DataTableColumnHeader column={column} title="Boarding Point" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="min-w-max">{row.getValue("boardingPoint")}</div>
    ),
    accessorKey: "boardingPoint",
  },
  {
    id: "dropPoint",
    header: ({ column }) => (
      <div>
        <DataTableColumnHeader column={column} title="Drop Point" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="min-w-max">{row.getValue("dropPoint")}</div>
    ),
    accessorKey: "dropPoint",
  },
  {
    id: "bTimeStamp",
    header: ({ column }) => (
      <div>
        <DataTableColumnHeader
          column={column}
          title="Boarding Point Time Stamp"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="min-w-max">
        {new Date(row.getValue("bTimeStamp")).toLocaleTimeString()}
      </div>
    ),
    accessorKey: "bTimeStamp",
  },
  {
    id: "dTimeStamp",
    header: ({ column }) => (
      <div>
        <DataTableColumnHeader column={column} title="Drop Point Time Stamp" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="min-w-max">
        {new Date(row.getValue("dTimeStamp")).toLocaleTimeString()}
      </div>
    ),
    accessorKey: "dTimeStamp",
  },
];

export const crewStopColumns: ColumnDef<Stop>[] = [
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
    id: "stopName",
    header: ({ column }) => (
      <div>
        <DataTableColumnHeader column={column} title="Stop Name" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="min-w-max">{row.getValue("stopName")}</div>
    ),
    accessorKey: "stopName",
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "lat",
    header: ({ column }) => (
      <div>
        <DataTableColumnHeader column={column} title="Latitude" />
      </div>
    ),
    cell: ({ row }) => <div className="min-w-max">{row.getValue("lat")}</div>,
    accessorKey: "lat",
  },
  {
    id: "lng",
    header: ({ column }) => (
      <div>
        <DataTableColumnHeader column={column} title="Longitude" />
      </div>
    ),
    cell: ({ row }) => <div className="min-w-max">{row.getValue("lng")}</div>,
    accessorKey: "lng",
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
  },
  {
    id: "routeNumber",
    header: ({ column }) => (
      <div>
        <DataTableColumnHeader column={column} title="Route Number" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="min-w-max">{row.getValue("routeNumber")}</div>
    ),
    accessorKey: "routeNumber",
  },
  {
    id: "pickupTime",
    header: ({ column }) => (
      <div>
        <DataTableColumnHeader column={column} title="Pickup Time" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="min-w-max">{row.getValue("pickupTime")}</div>
    ),
    accessorKey: "pickupTime",
  },
  {
    id: "dropTime",
    header: ({ column }) => (
      <div>
        <DataTableColumnHeader column={column} title="Drop Time" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="min-w-max">{row.getValue("dropTime")}</div>
    ),
    accessorKey: "dropTime",
  },
  {
    id: "passengerCount",
    header: ({ column }) => (
      <div>
        <DataTableColumnHeader column={column} title="Passenger Count" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="min-w-max">{row.getValue("passengerCount")}</div>
    ),
    accessorKey: "passengerCount",
  },
];

export const passengerFleetColumns: ColumnDef<Fleet>[] = [
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
    id: "type",
    header: ({ column }) => (
      <div>
        <DataTableColumnHeader column={column} title="Bus Type" />
      </div>
    ),
    cell: ({ row }) => <div className="min-w-max">{row.getValue("type")}</div>,
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
      <DataTableColumnHeader column={column} title="Capacity" />
    ),
    cell: ({ row }) => (
      <div className="min-w-max">{row.getValue("capacity")}</div>
    ),
    accessorKey: "capacity",
  },
  {
    id: "ac",
    header: ({}) => <div>AC</div>,
    cell: ({ row }) => <div className="min-w-max">{row.getValue("ac")}</div>,
    accessorKey: "ac",
  },
];

export const passengerRouteColumns: ColumnDef<Route>[] = [
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
    id: "routeNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Route Number" />
    ),
    cell: ({ row }) => (
      <div className="min-w-max">{row.getValue("routeNumber")}</div>
    ),
    accessorKey: "routeNumber",
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "stops",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Stops" />
    ),
    cell: ({ row }) => <div className="min-w-max">{row.getValue("stops")}</div>,
    accessorKey: "stops",
  },
  {
    id: "startTime",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Start Time" />
    ),
    cell: ({ row }) => (
      <div className="min-w-max">{row.getValue("startTime")}</div>
    ),
    accessorKey: "startTime",
  },
  {
    id: "endTime",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="End Time" />
    ),
    cell: ({ row }) => (
      <div className="min-w-max">{row.getValue("endTime")}</div>
    ),
    accessorKey: "endTime",
  },
  {
    id: "startPoint",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Start Point" />
    ),
    cell: ({ row }) => (
      <div className="min-w-max">{row.getValue("startPoint")}</div>
    ),
    accessorKey: "startPoint",
  },
  {
    id: "distance",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Distance" />
    ),
    cell: ({ row }) => (
      <div className="min-w-max">{row.getValue("distance")}</div>
    ),
    accessorKey: "distance",
  },
  {
    id: "duration",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Duration" />
    ),
    cell: ({ row }) => (
      <div className="min-w-max">{row.getValue("duration")}</div>
    ),
    accessorKey: "duration",
  },
  {
    id: "driverId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Driver Id" />
    ),
    cell: ({ row }) => (
      <div className="min-w-max">{row.getValue("driverId")}</div>
    ),
    accessorKey: "driverId",
  },
];

export const passengerStopColumns: ColumnDef<Stop>[] = [
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
    id: "stopName",
    header: ({ column }) => (
      <div>
        <DataTableColumnHeader column={column} title="Stop Name" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="min-w-max">{row.getValue("stopName")}</div>
    ),
    accessorKey: "stopName",
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "lat",
    header: ({ column }) => (
      <div>
        <DataTableColumnHeader column={column} title="Latitude" />
      </div>
    ),
    cell: ({ row }) => <div className="min-w-max">{row.getValue("lat")}</div>,
    accessorKey: "lat",
  },
  {
    id: "lng",
    header: ({ column }) => (
      <div>
        <DataTableColumnHeader column={column} title="Longitude" />
      </div>
    ),
    cell: ({ row }) => <div className="min-w-max">{row.getValue("lng")}</div>,
    accessorKey: "lng",
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
  },
  {
    id: "routeNumber",
    header: ({ column }) => (
      <div>
        <DataTableColumnHeader column={column} title="Route Number" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="min-w-max">{row.getValue("routeNumber")}</div>
    ),
    accessorKey: "routeNumber",
  },
  {
    id: "pickupTime",
    header: ({ column }) => (
      <div>
        <DataTableColumnHeader column={column} title="Pickup Time" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="min-w-max">{row.getValue("pickupTime")}</div>
    ),
    accessorKey: "pickupTime",
  },
  {
    id: "dropTime",
    header: ({ column }) => (
      <div>
        <DataTableColumnHeader column={column} title="Drop Time" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="min-w-max">{row.getValue("dropTime")}</div>
    ),
    accessorKey: "dropTime",
  },
  {
    id: "passengerCount",
    header: ({ column }) => (
      <div>
        <DataTableColumnHeader column={column} title="Passenger Count" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="min-w-max">{row.getValue("passengerCount")}</div>
    ),
    accessorKey: "passengerCount",
  },
];


