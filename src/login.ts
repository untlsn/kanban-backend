import { FastifyInstance } from 'fastify';
import getDb from './db/getDb';
import { User } from './db/documents';
import createError from './helpers/createError';

export default function login(fastify: FastifyInstance) {
  fastify.post('/login', async (req, rep) => {
    const db = await getDb();

    const users = db.collection<User>('users');
    const body = req.body as Record<string, string>;

    const user = await users.findOne({ login: body.login });

    if (!user) {
      return createError(404, `User with login '${body.login}' does not exist`);
    }

    if (user.pwd != body.password) {
      return createError(403, 'Wrong password');
    }

    return rep.jwtSign({ _id: user._id });
  });
}
