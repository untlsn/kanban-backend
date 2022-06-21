import { createResCreator } from '../helpers/createRes';
import collections from '../db/collections';
import fastify from '../init';

interface Body {
  login: string,
  password: string,
}

export default function login() {
  fastify.post('/login', async (req, rep) => {
    const users = await collections.users;
    const { login: loginLike, password } = req.body as Body;
    const createRes = createResCreator(rep);

    // if user login using email or login
    const user = await (loginLike.includes('@')
      ? users.findOne({ email: loginLike })
      : users.findOne({ login: loginLike })
    );

    if (!user) {
      return createRes(404, 'User does not exist');
    }

    if (user.password != password) {
      return createRes(403, 'Wrong password');
    }

    return rep.jwtSign({ _id: user._id });
  });
}
