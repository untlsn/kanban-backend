import registers from './registers';
import endpoints from './endpoints';
import fastify from './init';
import execAll from './helpers/execAll';

execAll(registers, endpoints);

fastify.listen({ port: 8080 });
