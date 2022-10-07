import fastify from 'fastify';
import getData from './prisma/services/getData.ts';

const server = fastify();

server.get('/ping', async () => {
  await getData();
});

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
