"use client";

import { Button } from "@/components/ui/button";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import type * as z from "zod";
import { updateStopSchema } from "@/lib/zod-schema";
import { client } from "@/app/_trpc/client";
import { toast } from "@/components/ui/use-toast";
import { Edit } from "lucide-react";

interface EditStopModalProps {
  stopName: string;
  pickupTime: string;
  dropTime: string;
  passengerCount: number;
}

export default function EditStopModal({
  stopName,
  pickupTime,
  dropTime,
  passengerCount,
}: EditStopModalProps) {
  const { mutateAsync: editStop } = client.stop.updateStop.useMutation({
    onSuccess: () => {
      toast({
        description: "Stop updated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error updating stop",
        description: error.message,
      });
    },
  });
  const form = useForm<z.infer<typeof updateStopSchema>>({
    resolver: zodResolver(updateStopSchema),
    defaultValues: {
      stopName: stopName,
      pickupTime: pickupTime,
      dropTime: dropTime,
      passengerCount: passengerCount,
    },
  });
  const handleFleetData = async (data: z.infer<typeof updateStopSchema>) => {
    console.log(data);
    await editStop(data);
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
          <DialogTitle>Edit Stop</DialogTitle>
          <DialogDescription>
            Fill out the form below to edit stop.
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
