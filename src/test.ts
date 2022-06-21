import { FastifyInstance } from 'fastify';
import authenticate from './authenticate';

export default function test(fastify: FastifyInstance) {
  fastify.get(
    '/',
    { onRequest: [authenticate] },
    async (req, rep) => {
      const data = await req.jwtVerify();

      rep.send(data);
    },
  );
}
