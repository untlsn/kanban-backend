import { FastifyInstance } from 'fastify';
import createError from '../helpers/createError';
import collections from '../db/collections';

interface Body {
  login: string,
  password: string,
}

export default function login(fastify: FastifyInstance) {
  fastify.post('/login', async (req, rep) => {
    const users = await collections.users;
    const { login: loginLike, password } = req.body as Body;

    // if user login using email or login
    const user = await (loginLike.includes('@')
      ? users.findOne({ email: loginLike })
      : users.findOne({ login: loginLike })
    );

    if (!user) {
      return createError(404, 'User does not exist');
    }

    if (user.password != password) {
      return createError(403, 'Wrong password');
    }

    return rep.jwtSign({ _id: user._id });
  });
}
