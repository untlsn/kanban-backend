import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import { FastifyInstance } from 'fastify';

export default function registers(fastify: FastifyInstance) {
  fastify.register(cors, {
    origin: '*',
  });

  fastify.register(jwt, {
    secret: 'supersecret',
  });
}
