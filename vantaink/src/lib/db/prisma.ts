import { PrismaClient } from "@prisma/client";

/**
 * SQLite via `DATABASE_URL` is for local demo persistence only — not for production.
 * Do not store real customer data; the file lives under `prisma/dev.db`.
 */

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.DEMO_API_DEBUG === "1" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}