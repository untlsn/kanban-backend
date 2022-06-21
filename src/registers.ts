import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import fastify from './init';

export default function registers() {
  fastify.register(cors, {
    origin: '*',
  });

  fastify.register(jwt, {
    secret: 'supersecret',
  });
}
