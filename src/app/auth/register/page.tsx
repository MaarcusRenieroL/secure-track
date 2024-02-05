"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { registerSchema } from "@/lib/zod-schema";
import { client } from "@/app/_trpc/client";
import { toast } from "@/components/ui/use-toast";

export default function RegisterPage() {
  const router = useRouter();
  const { mutateAsync, isLoading } = client.user.addUser.useMutation({
    onSuccess: () => {
      toast({
        title: "Account created",
        description: "You can now login",
        duration: 5000,
      });
      router.push("/login");
    },
    onError: (err) => {
      toast({
        title: "Error",
        description: "Something went wrong",
        duration: 5000,
      });
      console.log(err);
    },
  });
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleLogin = async (data: z.infer<typeof registerSchema>) => {
    await mutateAsync(data);
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Form {...form}>
        <Card>
          <CardHeader>
            <CardTitle>Create your account</CardTitle>
            <CardDescription>
              Enter your name, email and password to register
            </CardDescription>
          </CardHeader>
          <form onSubmit={form.handleSubmit(handleLogin)}>
            <CardContent className="space-y-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <Label>Name</Label>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="name"
                        placeholder="Enter your name here"
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
                  <FormItem>
                    <FormLabel>
                      <Label>Email</Label>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email here"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <Label>Password</Label>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password here"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <Label>Confirm Password</Label>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Re-enter your password here"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="w-full flex-col space-y-5">
              <Button className="w-full" type="submit">
                Register
              </Button>
              <CardDescription>
                Already have an account?{" "}
                <span>
                  <Link href={"/auth/login"}>
                    <Button variant={"link"} disabled={isLoading}>
                      {isLoading ? "Registering user" : "Login here 👇🏻"}
                    </Button>
                  </Link>
                </span>
              </CardDescription>
            </CardFooter>
          </form>
        </Card>
      </Form>
    </div>
  );
}
