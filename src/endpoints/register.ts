import { FastifyInstance } from 'fastify';
import collections from '../db/collections';
import createError from '../helpers/createError';

interface Body {
  login: string,
  email: string,
  password: string,
}

export default function register(fastify: FastifyInstance) {
  fastify.post('/register', async (req, rep) => {
    const users = await collections.users;
    const { login, email, password } = req.body as Body;

    // Try to find user with same login or email
    const user = await users.findOne({
      $or: [
        { login },
        { email },
      ],
    });

    // If user exist return why register failed (same login or email)
    if (user) {
      return createError(
        409,
        'User with this data exist',
        {
          conflictWith: {
            login: user.login == login,
            email: user.email == email,
          },
        },
      );
    }

    const newUser = await users.insertOne({ login, email, password });

    return rep.jwtSign({ _id: newUser.insertedId });
  });
}
