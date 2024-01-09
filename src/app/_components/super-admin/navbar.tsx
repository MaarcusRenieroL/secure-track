"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import Link from "next/link";

const SuperAdminNavbar: React.FC = () => {
  const navLinks = [
    {
      name: "Home",
      href: "/super-admin",
    },
    {
      name: "Organizations",
      href: "/super-admin/organizations",
    },
    {
      name: "Users",
      href: "/super-admin/users",
    },
    {
      name: "Fleets",
      href: "/super-admin/fleets",
    },
    {
      name: "Routes",
      href: "/super-admin/routes",
    },
    {
      name: "Stops",
      href: "/super-admin/stops",
    },
    {
      name: "Tracking Logs",
      href: "/super-admin/tracking-logs",
    },
    {
      name: "Passenger Logs",
      href: "/super-admin/passenger-logs",
    },
    {
      name: "Settings",
      href: "/super-admin/settings",
    },
  ];
  return (
    <div className="flex w-full items-center justify-between p-6">
      <Link href="/super-admin">Secure Track - Super Admin</Link>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Hello, Super Admin</SheetTitle>
          </SheetHeader>
          <div className="mt-10 grid gap-4">
            {navLinks.map((link, index) => (
              <Link key={index} href={link.href}>
                <Button variant={"link"} className="w-full hover:bg-muted">
                  {link.name}
                </Button>
              </Link>
            ))}
          </div>
          <SheetFooter className="mt-10">
            <SheetClose asChild>
              <Button type="submit" className="w-full">
                Logout
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SuperAdminNavbar;
