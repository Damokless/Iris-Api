export default async function generateToken(id: string, username: string, fastify:any) {
  return fastify.jwt.sign({ id, username });
}
