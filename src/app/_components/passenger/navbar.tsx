"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import Link from "next/link";

const PassengerNavbar: React.FC = () => {
	const navLinks = [
		{
			name: "Home",
			href: "/passenger",
		},
		{
			name: "Fleets",
			href: "/passenger/fleets",
		},
		{
			name: "Routes",
			href: "/passenger/routes",
		},
		{
			name: "Stops",
			href: "/passenger/stops",
		},
	];
	return (
		<div className="flex w-screen items-center justify-between p-6">
			<Link href="/passenger">
				<h1>Secure Track - Passenger</h1>
			</Link>
			<Sheet>
				<SheetTrigger asChild>
					<Button variant="outline">
						<MenuIcon />
					</Button>
				</SheetTrigger>
				<SheetContent>
					<SheetHeader>
						<SheetTitle>Hello, Passenger</SheetTitle>
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

export default PassengerNavbar;
