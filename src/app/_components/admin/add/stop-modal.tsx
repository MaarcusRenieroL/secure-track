"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import type * as z from "zod";
import { stopSchema } from "@/lib/zod-schema";
import { client } from "@/app/_trpc/client";
import { toast } from "@/components/ui/use-toast";
import { Fleet, Route } from "@prisma/client";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { CheckIcon } from "lucide-react";
import { CaretSortIcon } from "@radix-ui/react-icons";

interface AddStopModalProps {
  fleets: Fleet[];
  routes: Route[];
}

export default function AddStopModal({ fleets, routes }: AddStopModalProps) {
  const { mutateAsync: addNewStop } = client.stop.addStop.useMutation({
    onSuccess: () => {
      toast({
        description: "Stop added successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error adding Stop",
        description: error.message,
      });
    },
  });
  const form = useForm<z.infer<typeof stopSchema>>({
    resolver: zodResolver(stopSchema),
    defaultValues: {
      routeName: "",
      fleetNumber: "",
      stopName: "",
      pickupTime: "",
      dropTime: "",
      passengerCount: 0,
    },
  });
  const handleFleetData = async (data: z.infer<typeof stopSchema>) => {
    console.log(data);
    await addNewStop(data);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add New Stop</Button>
      </DialogTrigger>
      <DialogContent className="max-w-7xl">
        <DialogHeader>
          <DialogTitle>Add New Stop</DialogTitle>
          <DialogDescription>
            Fill out the form below to add a new stop.
          </DialogDescription>
        </DialogHeader>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(handleFleetData)}>
            <div className="grid grid-cols-4">
              <FormField
                control={form.control}
                name="stopName"
                render={({ field }) => (
                  <FormItem className="p-4">
                    <FormLabel>
                      <Label>Stop Name</Label>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter stop name"
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
                        type="text"
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
                name="pickupTime"
                render={({ field }) => (
                  <FormItem className="p-4">
                    <FormLabel>
                      <Label>Pickup Time</Label>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter pickup time"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dropTime"
                render={({ field }) => (
                  <FormItem className="p-4">
                    <FormLabel>
                      <Label>Drop Time</Label>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter drop time"
                        {...field}
                      />
                    </FormControl>
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
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value
                              ? fleets.find(
                                  (fleet) => fleet.fleetNumber === field.value,
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
                                  form.setValue(
                                    "fleetNumber",
                                    fleet.fleetNumber,
                                  );
                                }}
                              >
                                {fleet.fleetNumber}
                                <CheckIcon
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    fleet.fleetNumber === field.value
                                      ? "opacity-100"
                                      : "opacity-0",
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
                name="routeName"
                render={({ field }) => (
                  <FormItem className="p-4">
                    <FormLabel>Route Name</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full justify-between",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value
                              ? routes.find(
                                  (route) => route.routeName === field.value,
                                )?.routeName
                              : "Select route name"}
                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search route name..."
                            className="h-9"
                          />
                          <CommandEmpty>No fleet number found.</CommandEmpty>
                          <CommandGroup>
                            {routes.map((route) => (
                              <CommandItem
                                value={route.routeName}
                                key={route.routeName}
                                onSelect={() => {
                                  form.setValue("routeName", route.routeName);
                                }}
                              >
                                {route.routeName}
                                <CheckIcon
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    route.routeName === field.value
                                      ? "opacity-100"
                                      : "opacity-0",
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
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
