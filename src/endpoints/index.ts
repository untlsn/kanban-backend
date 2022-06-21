import { FastifyInstance } from 'fastify';
import register from './register';
import login from './login';

export default function endpoints(fastify: FastifyInstance) {
  [register, login].forEach((fn) => fn(fastify));
}
