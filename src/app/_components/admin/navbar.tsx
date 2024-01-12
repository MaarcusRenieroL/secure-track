"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import Link from "next/link";

const AdminNavbar: React.FC = () => {
  const navLinks = [
    {
      name: "Home",
      href: "/admin",
    },
    {
      name: "Users",
      href: "/admin/users",
    },
    {
      name: "Fleets",
      href: "/admin/fleets",
    },
    {
      name: "Routes",
      href: "/admin/routes",
    },
    {
      name: "Stops",
      href: "/admin/stops",
    },
    {
      name: "Tracking Logs",
      href: "/admin/tracking-logs",
    },
    {
      name: "Passenger Logs",
      href: "/admin/passenger-logs",
    },
    {
      name: "Settings",
      href: "/admin/settings",
    },
  ];
  return (
    <div className="flex w-full items-center justify-between p-6">
      <Link href="/admin">
        <h1>Secure Track - Admin</h1>
      </Link>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Hello, Admin</SheetTitle>
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

export default AdminNavbar;
