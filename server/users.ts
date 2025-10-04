// src/lib/server-actions.ts
"use server";

import { prisma } from "@/db/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

/**
 * getCurrentUser - server-side helper to protect App Router routes.
 * - Uses auth.api.getSession({ headers: await headers() })
 * - Redirects to /login if no session or no user in DB
 */
export const getCurrentUser = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const currentUser = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!currentUser) {
    redirect("/login");
  }

  return {
    ...session,
    currentUser,
  };
};

/**
 * signIn - server action that triggers your auth signIn flow (unchanged)
 */
export const signIn = async (email: string, password: string) => {
  try {
    await auth.api.signInEmail({
      body: { email, password },
    });

    return { success: true, message: "Signed in successfully." };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message || "An unknown error occurred.",
    };
  }
};

/**
 * signUp - server action that triggers your auth signUp flow (unchanged)
 */
export const signUp = async (
  email: string,
  password: string,
  username: string
) => {
  try {
    await auth.api.signUpEmail({
      body: { email, password, name: username },
    });

    return { success: true, message: "Signed up successfully." };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message || "An unknown error occurred.",
    };
  }
};

/**
 * getUsers - returns users who are NOT members of the passed organizationId.
 * Uses Prisma relation filter `members: { none: { organizationId } }` which
 * is efficient and avoids two round-trips.
 */
// export const getUsers = async (organizationId: string) => {
//   try {
//     const users = await prisma.user.findMany({
//       where: {
//         members: {
//           none: {
//             organizationId,
//           },
//         },
//       },
//     });
//     return users;
//   } catch (error) {
//     console.error("getUsers error:", error);
//     return [];
//   }
// };
