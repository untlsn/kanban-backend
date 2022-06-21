import Fastify from 'fastify';
import registers from './registers';
import test from './test';
import login from './login';

const fastify = Fastify({
  logger: true,
});

[registers, test, login].forEach((fn) => fn(fastify));

fastify.listen({ port: 8080 });
