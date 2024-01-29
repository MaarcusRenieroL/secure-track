"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import type * as z from "zod";
import { routeSchema } from "@/lib/zod-schema";
import { client } from "@/app/_trpc/client";
import { toast } from "@/components/ui/use-toast";
import { Fleet, User } from "@prisma/client";
import { cn } from "@/lib/utils";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Command, CommandInput, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { CheckIcon } from "lucide-react";
import { CaretSortIcon  } from "@radix-ui/react-icons";

interface AddRouteModalProps {
  fleets: Fleet[];
  users: User[];
}

export default function AddRouteModal({ fleets, users }: AddRouteModalProps) {
  const { mutateAsync: addNewRoute } = client.route.addRoute.useMutation({
    onSuccess: () => {
      toast({
        description: "Route added successfully",
      });
    },
    onError: (error) => {
      console.log(error);
      toast({
        title: "Error adding Route",
        description: error.message,
      });
    },
  });
  const form = useForm<z.infer<typeof routeSchema>>({
    resolver: zodResolver(routeSchema),
    defaultValues: {
      routeName: "",
      stops: "",
      passengerCount: 0,
      startTime: "",
      endTime: "",
      startPoint: "",
      distance: 0,
      duration: 0,
      driverName: "",
      fleetNumber: "",
    },
  });
  const handleFleetData = async (data: z.infer<typeof routeSchema>) => {
    console.log(data);
    await addNewRoute(data);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add New Route</Button>
      </DialogTrigger>
      <DialogContent className="max-w-7xl">
        <DialogHeader>
          <DialogTitle>Add New Route</DialogTitle>
          <DialogDescription>
            Fill out the form below to add a new route.
          </DialogDescription>
        </DialogHeader>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(handleFleetData)}>
            <div className="grid grid-cols-4">
              <FormField
                control={form.control}
                name="routeName"
                render={({ field }) => (
                  <FormItem className="p-4">
                    <FormLabel>
                      <Label>Route Number</Label>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter route number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="stops"
                render={({ field }) => (
                  <FormItem className="p-4">
                    <FormLabel>
                      <Label>Stops</Label>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter list of stops"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="passengerCount"
                render={({ field }) => (
                  <FormItem className="p-4">
                    <FormLabel>
                      <Label>Passenger Count</Label>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter passenger count"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem className="flex flex-col p-4">
                    <FormLabel className="mb-2">
                      <Label>Start Time</Label>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter Start Time"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endTime"
                render={({ field }) => (
                  <FormItem className="flex flex-col p-4">
                    <FormLabel className="mb-2">
                      <Label>End Time</Label>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter Start Time"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="startPoint"
                render={({ field }) => (
                  <FormItem className="p-4">
                    <FormLabel>
                      <Label>Start Point</Label>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter Start Point"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="distance"
                render={({ field }) => (
                  <FormItem className="p-4">
                    <FormLabel>
                      <Label>Distance</Label>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter Distance"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem className="p-4">
                    <FormLabel>
                      <Label>Duration</Label>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter Duration"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="driverName"
                render={({ field }) => (
                  <FormItem className="p-4">
                    <FormLabel>Driver Name</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? users.find(
                                (user) => user.name === field.value
                              )?.name
                              : "Select user"}
                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search crew members..."
                            className="h-9"
                          />
                          <CommandEmpty>No users found.</CommandEmpty>
                          <CommandGroup>
                            {users.filter((user) => user.role === "CREW").map((user) => (
                              <CommandItem
                                value={user.name}
                                key={user.name}
                                onSelect={() => {
                                  form.setValue("driverName", user.name)
                                }}
                              >
                                {user.name}
                                <CheckIcon
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    user.name === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fleetNumber"
                render={({ field }) => (
                  <FormItem className="p-4">
                    <FormLabel>Fleet Number</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? fleets.find(
                                (fleet) => fleet.fleetNumber === field.value
                              )?.fleetNumber
                              : "Select fleet number"}
                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search fleet number..."
                            className="h-9"
                          />
                          <CommandEmpty>No fleet number found.</CommandEmpty>
                          <CommandGroup>
                            {fleets.map((fleet) => (
                              <CommandItem
                                value={fleet.fleetNumber}
                                key={fleet.fleetNumber}
                                onSelect={() => {
                                  form.setValue("fleetNumber", fleet.fleetNumber)
                                }}
                              >
                                {fleet.fleetNumber}
                                <CheckIcon
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    fleet.fleetNumber === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
