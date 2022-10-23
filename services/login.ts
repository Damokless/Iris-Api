/* Imports libs */
import { PrismaClient } from '@prisma/client';
import argon2 from 'argon2';
import generateToken from './generateToken';

/* Creating a new instance of the PrismaClient. */
const prisma = new PrismaClient();

export default async function login(body: any, fastify: any) {
/* Finding the user by email and returning the hashed password. */
  const user = await prisma.users.findFirst({
    where: {
      email: body.email,
    },
    select: {
      password: true,
      id: true,
      username: true,
    },
  });
  /* Checking if the user is not null and it is checking if the password is correct. */
  if (user?.password) {
    const match: boolean = await argon2.verify(user.password, body.password);
    if (match && user.username) {
      return { status: 200, token: await generateToken(user?.id, user?.username, fastify) };
    }
    // if password not match return error
    return { status: 401, message: 'Incorrect password' };
  }
  /* Returning an object with a status and a message if user is null */
  return { status: 404, message: 'User not found' };
}
