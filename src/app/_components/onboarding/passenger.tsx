"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { passengerFormSchema } from "@/lib/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { client } from "@/app/_trpc/client";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

interface PassengerOnboardingProps {
  email: string;
}

export default function PassengerOnboarding({
  email,
}: PassengerOnboardingProps) {
  const router = useRouter();
  const { mutateAsync: addPassenger } = client.user.addPassenger.useMutation({
    onSuccess: () => {
      toast({
        description: "Passenger added",
      });
    },
    onError: (error) => {
      toast({
        title: "Error adding passenger",
        description: error.message,
      });
    },
  });
  const form = useForm<z.infer<typeof passengerFormSchema>>({
    resolver: zodResolver(passengerFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: email,
      addressLine1: "",
      addressLine2: "",
      addressLine3: "",
      phone: {
        phoneNumber: "",
        altPhoneNumber: "",
      },
      state: "",
      city: "",
      pincode: "",
      gender: "MALE",
    },
  });

  const handlePassengerData = async (
    data: z.infer<typeof passengerFormSchema>,
  ) => {
    await addPassenger(data);
    router.push("/passenger");
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <Card className="p-4 w-9/12">
        <CardTitle className="px-4">Passenger Onboarding</CardTitle>
        <CardDescription className="px-4">Add new passenger</CardDescription>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(handlePassengerData)}>
            <CardContent className="p-0">
              <div className="grid grid-cols-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="p-4">
                      <FormLabel>
                        <Label>First Name</Label>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter first name here"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="p-4">
                      <FormLabel>
                        <Label>Last Name</Label>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter last name here"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="p-4">
                      <FormLabel>
                        <Label>Email</Label>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter email here"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem className="p-4">
                      <FormLabel>
                        <Label>Gender</Label>
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="MALE">MALE</SelectItem>
                          <SelectItem value="FEMALE">FEMALE</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone.phoneNumber"
                  render={({ field }) => (
                    <FormItem className="p-4">
                      <FormLabel>
                        <Label>Phone Number</Label>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter phone number here"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone.altPhoneNumber"
                  render={({ field }) => (
                    <FormItem className="p-4">
                      <FormLabel>
                        <Label>Alternate Phone Number</Label>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter alternate phone number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="addressLine1"
                  render={({ field }) => (
                    <FormItem className="p-4">
                      <FormLabel>
                        <Label>Address Line 1</Label>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter address line 1"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="addressLine2"
                  render={({ field }) => (
                    <FormItem className="p-4">
                      <FormLabel>
                        <Label>Address Line 2</Label>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter address line 2"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="addressLine3"
                  render={({ field }) => (
                    <FormItem className="p-4">
                      <FormLabel>
                        <Label>Address Line 3</Label>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter address line 3"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem className="p-4">
                      <FormLabel>
                        <Label>City</Label>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter city"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem className="p-4">
                      <FormLabel>
                        <Label>State</Label>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter state"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pincode"
                  render={({ field }) => (
                    <FormItem className="p-4">
                      <FormLabel>
                        <Label>Pincode</Label>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter pincode"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter className="space-x-5 w-full justify-end pt-4">
              <Button variant="outline">Cancel</Button>
              <Button type="submit">Save Changes</Button>
            </CardFooter>
          </form>
        </FormProvider>
      </Card>
    </div>
  );
}
