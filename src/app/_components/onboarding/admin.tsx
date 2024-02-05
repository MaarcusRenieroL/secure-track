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
import { organizationFormSchema } from "@/lib/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { client } from "@/app/_trpc/client";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export default function AdminOnboarding() {
  const router = useRouter();
  const { mutateAsync: addOrganization } =
    client.organization.addOrganization.useMutation({
      onSuccess: () => {
        toast({
          description: "Organization added",
        });
      },
      onError: (error) => {
        toast({
          title: "Error adding organization",
          description: error.message,
        });
      },
    });
  const form = useForm<z.infer<typeof organizationFormSchema>>({
    resolver: zodResolver(organizationFormSchema),
    defaultValues: {
      orgName: "",
      orgType: "SCHOOL",
      fleetsCount: "",
      crewsCount: "",
      passengersCount: "",
      routesCount: "",
      adminName: "",
      adminEmail: "",
      addressLine1: "",
      addressLine2: "",
      addressLine3: "",
      phone: {
        adminPhoneNumber: "",
        altAdminPhoneNumber: "",
      },
    },
  });

  const handleOrganizationData = async (
    data: z.infer<typeof organizationFormSchema>,
  ) => {
    await addOrganization(data);
    router.push("/admin");
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <Card className="p-4 w-9/12">
        <CardTitle className="px-4">Admin Onboarding</CardTitle>
        <CardDescription className="px-4">Add new organization</CardDescription>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(handleOrganizationData)}>
            <CardContent className="p-0">
              <div className="grid grid-cols-4">
                <FormField
                  control={form.control}
                  name="orgName"
                  render={({ field }) => (
                    <FormItem className="p-4">
                      <FormLabel>
                        <Label>Organization Name</Label>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter fleet number here"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="orgType"
                  render={({ field }) => (
                    <FormItem className="p-4">
                      <FormLabel>
                        <Label>Organization Type</Label>
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select organization type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="SCHOOL">SCHOOL</SelectItem>
                          <SelectItem value="COLLEGE">COLLEGE</SelectItem>
                          <SelectItem value="COMPANY">COMPANY</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="fleetsCount"
                  render={({ field }) => (
                    <FormItem className="p-4">
                      <FormLabel>
                        <Label>Fleets Count</Label>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter total number of fleets"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="routesCount"
                  render={({ field }) => (
                    <FormItem className="p-4">
                      <FormLabel>
                        <Label>Routes Count</Label>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter total number of routes"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="passengersCount"
                  render={({ field }) => (
                    <FormItem className="p-4">
                      <FormLabel>
                        <Label>Passengers Count</Label>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter total number of passengers"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="crewsCount"
                  render={({ field }) => (
                    <FormItem className="p-4">
                      <FormLabel>
                        <Label>Crews Count</Label>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter total number of crews"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="adminName"
                  render={({ field }) => (
                    <FormItem className="p-4">
                      <FormLabel>
                        <Label>Admin Name</Label>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter administrator name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="adminEmail"
                  render={({ field }) => (
                    <FormItem className="p-4">
                      <FormLabel>
                        <Label>Admin Email</Label>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter administrator email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone.adminPhoneNumber"
                  render={({ field }) => (
                    <FormItem className="p-4">
                      <FormLabel>
                        <Label>Admin Phone Number</Label>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter administrator phone number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone.altAdminPhoneNumber"
                  render={({ field }) => (
                    <FormItem className="p-4">
                      <FormLabel>
                        <Label>Alternate Admin Phone Number</Label>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter alternate administrator phone number"
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
