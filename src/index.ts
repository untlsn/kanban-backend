import Fastify from 'fastify';
import registers from './registers';
import test from './test';
import endpoints from './endpoints';

const fastify = Fastify({
  logger: true,
});

[registers, test, endpoints].forEach((fn) => fn(fastify));

fastify.listen({ port: 8080 });
