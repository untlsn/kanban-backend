import authenticate from '../../authenticate';
import collections from '../../db/collections';
import fastify from '../../init';

export default function GET() {
  fastify.get('/board', { onRequest: [authenticate] }, async (req) => {
    const { _id } = await req.jwtVerify();
    const boards = await collections.boards;

    const userBoards = await boards.find({ owner: _id }).toArray();
    return userBoards.map(({ _id, name }) => ({
      _id,
      name,
    }));
  });
}
