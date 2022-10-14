// Imports libs and imports api services
import { PrismaClient } from '@prisma/client';
import argon2 from 'argon2';

/* Creating a new instance of the PrismaClient. */
const prisma = new PrismaClient();

/* Setting the hashing config for the password. */
const hashingConfig = { // based on OWASP cheat sheet recommendations (as of March, 2022)
  parallelism: 1,
  memoryCost: 2 ** 16,
  hashLength: 64,
  timeCost: 3, // number of itetations
  type: argon2.argon2id,
};

/**
 * Creating a new user in the DB with the email, username, and password provided in the request
 * body
 * @param {any} body - any - This is the body of the request.
 * @returns The user object
 */
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
