import { FastifyInstance } from 'fastify';
import createError from '../helpers/createError';
import collections from '../db/collections';

export default function login(fastify: FastifyInstance) {
  fastify.post('/login', async (req, rep) => {
    const users = await collections.users;
    const body = req.body as Record<string, string>;

    const user = await users.findOne({ login: body.login });

    if (!user) {
      return createError(404, `User with login '${body.login}' does not exist`);
    }

    if (user.password != body.password) {
      return createError(403, 'Wrong password');
    }

    return rep.jwtSign({ _id: user._id });
  });
}
