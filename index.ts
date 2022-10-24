// Imports libs and imports api services
import Fastify from 'fastify';
import fastifyJwt from '@fastify/jwt';
import fs from 'fs';
import * as dotenv from 'dotenv';

dotenv.config();
import register from './services/register';
import login from './services/login';

/* Creating a new instance of the Fastify server with HTTPS protocol. */
const fastify = Fastify({
  logger: true,
  https: {
    key: fs.readFileSync('./server.key'),
    cert: fs.readFileSync('./server.crt'),
  },
});
fastify.register(fastifyJwt, {
  secret: `${process.env.SECRET_TOKEN}`,
});

/* Creating a new routes for the server. */
fastify.post('/register', async (req) => register(req.body, fastify));
fastify.post('/login', async (req) => login(req.body, fastify));

/* Listening to the port 4000 and if there is an error it will log it and exit the process. */
fastify.listen({ port: 4000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
