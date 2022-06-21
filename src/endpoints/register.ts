import collections from '../db/collections';
import createRes from '../helpers/createRes';
import fastify from '../init';

interface Body {
  login: string,
  email: string,
  password: string,
}

export default function register() {
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

    // If user exist return why board failed (same login or email)
    if (user) {
      return createRes(
        rep,
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
