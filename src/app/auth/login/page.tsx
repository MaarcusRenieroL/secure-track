"use client";

import { useForm } from "react-hook-form";
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
import Link from "next/link";

export default function LoginPage() {

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (data: any) => {
    console.log(data);
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Form {...form}>
        <Card>
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your email and password to login
            </CardDescription>
          </CardHeader>
          <form onSubmit={form.handleSubmit(handleLogin)}>
            <CardContent className="space-y-5">
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
            </CardContent>
            <CardFooter className="w-full flex-col space-y-5">
              <Button className="w-full" type="submit">
                Login
              </Button>
              <CardDescription>
                Don&apos;t have an account?{" "}
                <span>
                  <Link href={"/auth/register"}>
                    <Button variant={"link"}>
                      Register here 👇🏻
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
