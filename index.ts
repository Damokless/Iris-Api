// Imports libs and imports api services
import Fastify from 'fastify';
import fastifyJwt from '@fastify/jwt';
import cors from '@fastify/cors';
import * as dotenv from 'dotenv';
import register from './services/register';
import login from './services/login';
import tiktok from './services/tiktok';
import tiktokCallback from './services/tiktokCallback';

dotenv.config();

/* Creating a new instance of the Fastify server with HTTPS protocol. */
const fastify = Fastify({
  logger: true,
});
fastify.register(fastifyJwt, { secret: `${process.env.SECRET_TOKEN}` })
  .register(cors, { origin: true });
const port: number = Number(process.env.PORT) || 4000;

/* Creating a new routes for the server. */
fastify.post('/register', async (req) => register(req.body, fastify));
fastify.post('/login', async (req) => login(req.body, fastify));
fastify.get('/tiktokAUTH', async (req, res) => res.redirect(tiktok()));
fastify.get('/tiktokAUTHCallback', async (req) => tiktokCallback(req.body));

/* Listening to the port 4000 and if there is an error it will log it and exit the process. */
fastify.listen({ port }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
