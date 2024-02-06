"use client";

import { client } from "@/app/_trpc/client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";

import { CalendarIcon, Edit } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import type * as z from "zod";
import { format } from "date-fns";

import { updateFleetFormSchema } from "@/lib/zod-schema";
import { FleetStatus, FleetType } from "@prisma/client";

interface EditFleetModalProps {
  fleetNumber: string;
  regNumber: string;
  make: string;
  model: string;
  year: number;
  type: FleetType;
  color: string;
  status: FleetStatus;
  fcExpDate: Date;
  capacity: number;
  ac: boolean;
}

export function EditFleetModal({
  fleetNumber,
  regNumber,
  make,
  model,
  year,
  type,
  color,
  status,
  fcExpDate,
  capacity,
  ac,
}: EditFleetModalProps) {
  const { mutateAsync: editFleet } = client.fleet.updateFleet.useMutation({
    onSuccess: () => {
      toast({
        description: "Fleet updated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error updating Fleet",
        description: error.message,
      });
    },
  });
  const form = useForm<z.infer<typeof updateFleetFormSchema>>({
    resolver: zodResolver(updateFleetFormSchema),
    defaultValues: {
      fleetNumber: fleetNumber,
      regNumber: regNumber,
      make: make,
      model: model,
      year: year,
      type: type as FleetType,
      color: color,
      status: status as FleetStatus,
      fcExpDate: fcExpDate,
      capacity: capacity,
      ac: ac,
    },
  });
  const handleFleetData = async (
    data: z.infer<typeof updateFleetFormSchema>,
  ) => {
    await editFleet(data);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon">
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-7xl">
        <DialogHeader>
          <DialogTitle>Add New Fleet</DialogTitle>
          <DialogDescription>
            Fill out the form below to add a new fleet.
          </DialogDescription>
        </DialogHeader>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(handleFleetData)}>
            <div className="grid grid-cols-4">
              <FormField
                control={form.control}
                name="fleetNumber"
                render={({ field }) => (
                  <FormItem className="p-4">
                    <FormLabel>
                      <Label>Fleet Number</Label>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter fleet number here"
                        {...field}
                        disabled
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="regNumber"
                render={({ field }) => (
                  <FormItem className="p-4">
                    <FormLabel>
                      <Label>Registration Number</Label>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter registration number here"
                        {...field}
                        disabled
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="make"
                render={({ field }) => (
                  <FormItem className="p-4">
                    <FormLabel>
                      <Label>Make</Label>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter make here"
                        {...field}
                        disabled
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItem className="p-4">
                    <FormLabel>
                      <Label>Model</Label>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter model here"
                        {...field}
                        disabled
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem className="p-4">
                    <FormLabel>
                      <Label>Year</Label>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter year here"
                        {...field}
                        disabled
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="p-4">
                    <FormLabel>
                      <Label>Type</Label>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a bus type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="BUS">BUS</SelectItem>
                        <SelectItem value="MINI_BUS">MINI_BUS</SelectItem>
                        <SelectItem value="VAN">VAN</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem className="p-4">
                    <FormLabel>
                      <Label>Color</Label>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter color here"
                        {...field}
                        disabled
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="p-4">
                    <FormLabel>
                      <Label>Status</Label>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a bus type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="ACTIVE">ACTIVE</SelectItem>
                        <SelectItem value="INACTIVE">INACTIVE</SelectItem>
                        <SelectItem value="MAINTENANCE">MAINTENANCE</SelectItem>
                        <SelectItem value="IDLE">IDLE</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fcExpDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col p-4">
                    <FormLabel className="mb-2">
                      <Label>FC Expiry Date</Label>
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={`"w-[240px] pl-3 text-left font-normal ${
                              !field.value && "text-muted-foreground"
                            }`}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="" align="center">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date: Date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="capacity"
                render={({ field }) => (
                  <FormItem className="p-4">
                    <FormLabel>
                      <Label>Capacity</Label>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter capacity here"
                        {...field}
                        disabled
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ac"
                render={({}) => (
                  <FormItem className="p-4">
                    <FormLabel>
                      <Label>AC</Label>
                    </FormLabel>
                    <FormControl>
                      <Select disabled>
                        <SelectTrigger>
                          <SelectValue placeholder="True or False" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="true">True</SelectItem>
                          <SelectItem value="false">False</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
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
