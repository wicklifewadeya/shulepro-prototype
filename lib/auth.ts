import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@/prisma/generated/prisma-client";
import { nextCookies } from "better-auth/next-js";
import type { Resend as ResendType } from "resend";
import ForgotPasswordEmail from "@/components/emails/reset-password";

const prisma = new PrismaClient();
// const resend = new Resend(process.env.RESEND_API_KEY!);

let _resend: ResendType | undefined;

function getResendClient(): ResendType {
  if (!_resend) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error(
        "Missing RESEND_API_KEY environment variable. Add RESEND_API_KEY to .env.local or your hosting settings."
      );
    }
    // dynamic import optional if you want to avoid importing resend at top-level:
    const { Resend } = require("resend") as typeof import("resend");
    _resend = new Resend(apiKey);
  }
  return _resend;
}

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET!,
  url: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  database: prismaAdapter(prisma, { provider: "mysql" }),

  // emailAndPassword: {
  //   enabled: true,
  // },

  emailAndPassword: {
    enabled: true,
    resetPasswordTokenExpiresIn: 60 * 60, // 1 hour

    sendResetPassword: async ({ user, url, token }) => {
      const resend = getResendClient();
      const resetUrl = url ?? `${process.env.APP_URL}/reset?token=${token}`;

      try {
        console.debug("[auth] sendResetPassword ->", {
          email: user.email,
          resetUrl,
        });
        await resend.emails.send({
          from: `${process.env.EMAIL_SENDER_NAME} <${process.env.EMAIL_SENDER_ADDRESS}>`,
          to: user.email!,
          subject: "Reset your password",
          react: ForgotPasswordEmail({
            username: user.name ?? user.email,
            resetUrl,
            userEmail: user.email,
          }),
        });
      } catch (err) {
        console.error("[auth] sendResetPassword failed:", err);
        throw err; // important: surface the failure to Better Auth
      }
    },

    requireEmailVerification: false,
  },

  socialProviders: {
    google: process.env.GOOGLE_CLIENT_ID
      ? {
          clientId: process.env.GOOGLE_CLIENT_ID as string,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }
      : undefined,
  },

  // Use Next.js cookies plugin to manage session cookies automatically
  plugins: [nextCookies()],
});

export default auth;
