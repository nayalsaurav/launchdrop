
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client";

export const createClient = (url: string) => {
  const connectionString = url;
  const adapter = new PrismaPg({
    connectionString,
  });

  return new PrismaClient({
    log: ["error"],
    adapter,
  });
};
