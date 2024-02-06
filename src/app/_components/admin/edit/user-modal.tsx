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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import type * as z from "zod";
import { updateUserSchema } from "@/lib/zod-schema";
import { client } from "@/app/_trpc/client";
import { toast } from "@/components/ui/use-toast";
import { Edit } from "lucide-react";
import { UserRole } from "@prisma/client";

interface EditUserModalProps {
  id: string;
  email: string;
  role: UserRole;
}

export default function EditUserModal({ id, email, role }: EditUserModalProps) {
  const form = useForm<z.infer<typeof updateUserSchema>>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      userId: id,
      email: email,
      role: role,
    },
  });
  const { mutateAsync: editUser } = client.user.updateOrgUser.useMutation({
    onSuccess: () => {
      toast({
        description: "User updated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error updating User",
        description: error.message,
      });
    },
  });
  const handleUserData = async (data: z.infer<typeof updateUserSchema>) => {
    console.log(data);
    await editUser(data);
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
          <DialogTitle>Add New User</DialogTitle>
          <DialogDescription>
            Fill out the form below to add a new user.
          </DialogDescription>
        </DialogHeader>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(handleUserData)}>
            <div className="grid grid-cols-4">
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
                        placeholder="Enter email"
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
                name="role"
                render={({ field }) => (
                  <FormItem className="p-4">
                    <FormLabel>
                      <Label>User Role</Label>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select user role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="ADMIN">ADMIN</SelectItem>
                        <SelectItem value="CREW">CREW</SelectItem>
                        <SelectItem value="PASSENGER">PASSENGER</SelectItem>
                      </SelectContent>
                    </Select>
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
