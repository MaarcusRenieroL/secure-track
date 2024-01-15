"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { type AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type * as z from "zod";

import { loginSchema } from "@/lib/zod-schema";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const router = useRouter();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [loading, setLoading] = useState(false);

  const handleLogin = async (data: z.infer<typeof loginSchema>) => {
    await handlecredentialLogin(data, setLoading, router);
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
              <FormField control={form.control} name="email" render={({ field }) => (
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
              <FormField control={form.control} name="password" render={({ field }) => (
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
                    <Button variant={"link"} disabled={loading}>
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

async function handlecredentialLogin( values: z.infer<typeof loginSchema>, setLoading: React.Dispatch<React.SetStateAction<boolean>>, router: AppRouterInstance) {
  setLoading(true);
  try {
    const response = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    if (response) {
      // Check if response is not undefined
      if (response.error) {
        toast({
          title: "Error logging in",
          description: response.error,
        });
        return null;
      } else {
        toast({
          title: "Logged in successfully",
          description: "Redirecting you to your dashboard",
        });
        router.push("/");
      }
    }
  } catch (error) {
    console.log(error);
    toast({
      title: "Error logging in",
      description: "An error occurred while logging in",
    });
  } finally {
    setLoading(false);
  }
  return false;
}
