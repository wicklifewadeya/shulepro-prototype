/* File: ResetPasswordForm.tsx */

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React, { useState } from "react";

import Button from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { z } from "zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";

import styles from "./ResetPasswordForm.module.scss";

const formSchema = z.object({
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
});

export default function ResetPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = (searchParams?.get("token") as string) ?? "";

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    if (values.password !== values.confirmPassword) {
      toast.error("Passwords do not match");
      setIsLoading(false);
      return;
    }

    const { error } = await authClient.resetPassword({
      newPassword: values.password,
      token,
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Password reset successfully");
      router.push("/login");
    }

    setIsLoading(false);
  }

  return (
    <div className={styles.container} {...props}>
      <Card className={styles.card}>
        <CardHeader className={styles.cardHeader}>
          <CardTitle className={styles.cardTitle}>Reset Password</CardTitle>
          <CardDescription className={styles.cardDescription}>
            Enter your new password
          </CardDescription>
        </CardHeader>

        <CardContent className={styles.cardContent}>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className={styles.form}
            >
              <div className={styles.fields}>
                <div className={styles.fieldGroup}>
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input {...field} type="password" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input {...field} type="password" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className={styles.loader} />
                  ) : (
                    "Reset Password"
                  )}
                </Button>
              </div>

              <div className={styles.centerSmall}>
                Don&apos;t have an account?{" "}
                <Link href="/signup" className={styles.link}>
                  Sign up
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className={styles.mutedRow}>
        By clicking continue, you agree to our{" "}
        <Link href="#" className={styles.policyLink}>
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="#" className={styles.policyLink}>
          Privacy Policy
        </Link>
        .
      </div>
    </div>
  );
}
