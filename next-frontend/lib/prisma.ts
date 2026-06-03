//root/lib/prisma.ts

import {PrismaPg} from "@prisma/adapter-pg";
import {PrismaClient} from "@/generated/prisma/client";
import {loadEnvConfig} from '@next/env';

// This loads .env files exactly as Next.js does
loadEnvConfig(process.cwd());

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });
export { prisma };
