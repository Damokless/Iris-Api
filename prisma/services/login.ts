import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function login(body: any) {
  const user = await prisma.users.findFirst({
    where: {
      email: body.email,
    },
  });
  return user;
}
