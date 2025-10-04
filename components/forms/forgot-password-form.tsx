/* File: ForgotPasswordForm.tsx */

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

import styles from "./ForgotPasswordForm.module.scss";

const formSchema = z.object({
  email: z.string().email(),
});

export default function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    const { error } = await authClient.forgetPassword({
      email: values.email,
      redirectTo: "/reset-password",
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Password reset email sent");
    }

    setIsLoading(false);
  }

  return (
    <div className={styles.root} {...props}>
      <Card className={styles.card}>
        <CardHeader className={styles.header}>
          <CardTitle className={styles.title}>Forgot Password</CardTitle>
          <CardDescription className={styles.description}>
            Enter your email to reset your password
          </CardDescription>
        </CardHeader>

        <CardContent className={styles.content}>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className={styles.formWrapper}
            >
              <div className={styles.formGrid}>
                <div className={styles.fieldRow}>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="email@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  type="submit"
                  className={styles.primaryButton}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className={styles.spinner} />
                  ) : (
                    "Reset Password"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className={styles.legalText}>
        By clicking continue, you agree to our{" "}
        <Link href="#" className={styles.legalLink}>
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="#" className={styles.legalLink}>
          Privacy Policy
        </Link>
        .
      </div>
    </div>
  );
}
