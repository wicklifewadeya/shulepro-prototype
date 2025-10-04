// src/db/prisma.ts
import { PrismaClient } from "@/prisma/generated/prisma-client";

declare global {
  // allow a single PrismaClient instance in dev (HMR)
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined;
}

export const prisma: PrismaClient = globalThis.__prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.__prisma = prisma;
}
