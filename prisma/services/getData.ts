import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function main() {
  return prisma.users.findMany();
}
