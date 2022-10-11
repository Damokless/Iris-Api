import { PrismaClient } from '@prisma/client';
import argon2 from 'argon2';

const prisma = new PrismaClient();
const hashingConfig = { // based on OWASP cheat sheet recommendations (as of March, 2022)
  parallelism: 1,
  memoryCost: 2 ** 16,
  hashLength: 64,
  timeCost: 3, // number of itetations
  type: argon2.argon2id,
};

export default async function register(body: any) {
  const user = await prisma.users.create({
    data: {
      email: body.email,
      username: body.username,
      password: await argon2.hash(body.password, { ...hashingConfig }),
    },
  });
  return user;
}
