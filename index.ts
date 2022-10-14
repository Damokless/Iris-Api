// Imports libs and imports api services
import Fastify from 'fastify';
import fs from 'fs';
import register from './prisma/services/register';
import login from './prisma/services/login';

/* Creating a new instance of the Fastify server with HTTPS protocol. */
const fastify = Fastify({
  logger: true,
  https: {
    key: fs.readFileSync('./server.key'),
    cert: fs.readFileSync('./server.crt'),
  },
});

/* Creating a new routes for the server. */
fastify.post('/register', async (req) => register(req.body));
fastify.post('/login', async (req) => login(req.body));

/* Listening to the port 4000 and if there is an error it will log it and exit the process. */
fastify.listen({ port: 4000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
