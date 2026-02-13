import { createClient } from "@repo/database";

export const prisma = createClient(process.env.DATABASE_URL!);
