"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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

import { signUp } from "@/server/users";

import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

import styles from "./SignupForm.module.scss";

const formSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
});

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const signInWithGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    });
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    const { success, message } = await signUp(
      values.email,
      values.password,
      values.username
    );

    if (success) {
      toast.success(
        `${message as string} Please check your email for verification.`
      );
      router.push("/dashboard");
    } else {
      toast.error(message as string);
    }

    setIsLoading(false);
  }

  const rootClass = `${styles.root}${className ? " " + className : ""}`;

  return (
    <div className={rootClass} {...props}>
      <Card>
        <CardHeader className={styles.cardHeader}>
          <CardTitle className={styles.cardTitle}>Welcome back</CardTitle>
          <CardDescription className={styles.cardDescription}>
            Signup with your Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className={styles.form}
            >
              <div className={styles.innerGrid}>
                <div className={styles.socialWrapper}>
                  <Button
                    variant="primary"
                    className={styles.fullWidth}
                    type="button"
                    onClick={signInWithGoogle}
                  >
                    Signup with Google
                  </Button>
                </div>

                <div className={styles.divider}>
                  <span className={styles.dividerText}>Or continue with</span>
                </div>

                <div className={styles.fieldsGrid}>
                  <div className={styles.fieldGroup}>
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input placeholder="shadcn" {...field} />
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
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="m@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className={styles.fieldGroup}>
                    <div className={styles.passwordRow}>
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="********"
                                {...field}
                                type="password"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Link
                        href="/forgot-password"
                        className={styles.forgotLink}
                      >
                        Forgot your password?
                      </Link>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className={styles.fullWidth}
                    disabled={isLoading}
                  >
                    {isLoading ? "Loading..." : "Signup"}
                  </Button>
                </div>

                <div className={styles.footerText}>
                  Already have an account?{" "}
                  <Link href="/login" className={styles.loginLink}>
                    Login
                  </Link>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className={styles.legal}>
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
