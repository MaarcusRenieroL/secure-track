"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import type * as z from "zod";
import { updateRouteSchema } from "@/lib/zod-schema";
import { client } from "@/app/_trpc/client";
import { toast } from "@/components/ui/use-toast";
import { Edit } from "lucide-react";
import { StopsField } from "../stops-field";
import { Stop } from "@prisma/client";

interface EditRouteModalProps {
  routeName: string;
  stops: Stop[];
  passengerCount: number;
  startTime: string;
  endTime: string;
  startPoint: string;
  distance: number;
  duration: number;
}

export default function EditRouteModal({ routeName, stops, passengerCount, startTime, endTime, startPoint, distance, duration }: EditRouteModalProps) {
  const { mutateAsync: editRoute } = client.route.updateRoute.useMutation({
    onSuccess: () => {
      toast({
        description: "Route updated successfully",
      });
    },
    onError: (error) => {
      console.log(error);
      toast({
        title: "Error updating Route",
        description: error.message,
      });
    },
  });
  const form = useForm<z.infer<typeof updateRouteSchema>>({
    resolver: zodResolver(updateRouteSchema),
    defaultValues: {
      routeName: routeName,
      stops: [...stops.map((stop) => stop.stopId)],
      passengerCount: passengerCount,
      startTime: startTime,
      endTime: endTime,
      startPoint: startPoint,
      distance: distance,
      duration: duration,
    },
  });
  const handleRouteData = async (data: z.infer<typeof updateRouteSchema>) => {
    console.log(data);
    await editRoute(data);
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
          <DialogTitle>Edit Route</DialogTitle>
          <DialogDescription>
            Fill out the form below to edit route.
          </DialogDescription>
        </DialogHeader>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(handleRouteData)}>
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
                        disabled
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
              <StopsField stops={stops} />
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
