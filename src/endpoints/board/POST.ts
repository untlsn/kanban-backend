import authenticate from '../../authenticate';
import collections from '../../db/collections';
import createRes from '../../helpers/createRes';
import fastify from '../../init';

export default function POST() {
  fastify.post('/board', { onRequest: [authenticate] }, async (req, rep) => {
    const { _id } = await req.jwtVerify();
    const boards = await collections.boards;
    const { name } = req.body as { name: string };

    boards.insertOne({
      owner: _id,
      name,
    });

    return createRes(rep, 201, 'Board created');
  });
}
