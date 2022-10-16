/* Imports libs */
import { PrismaClient } from '@prisma/client';
import argon2 from 'argon2';

/* Creating a new instance of the PrismaClient. */
const prisma = new PrismaClient();

export default async function login(body: any) {
/* Finding the user by email and returning the hashed password. */
  const userPassword = await prisma.users.findFirst({
    where: {
      email: body.email,
    },
    select: {
      password: true,
    },
  });
  /* Checking if the userPassword is not null and it is checking if the password is correct. */
  if (userPassword?.password) {
    const match: boolean = await argon2.verify(userPassword.password, body.password);
    if (match) {
      return { status: 200 };
    }
    // if password not match return error
    return { status: 401, message: 'Incorrect password' };
  }
  /* Returning an object with a status and a message if userPassword is null */
  return { status: 404, message: 'User not found' };
}
