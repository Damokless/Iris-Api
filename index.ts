import Fastify from 'fastify';
import fs from 'fs';
import register from './prisma/services/register';
import login from './prisma/services/login';

const fastify = Fastify({
  logger: true,
  https: {
    key: fs.readFileSync('./server.key'),
    cert: fs.readFileSync('./server.crt'),
  },
});

fastify.post('/register', async (req) => register(req.body));
fastify.post('/login', async (req) => login(req.body));

fastify.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
