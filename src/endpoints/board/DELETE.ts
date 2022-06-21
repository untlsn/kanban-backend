import { ObjectId } from 'mongodb';
import authenticate from '../../authenticate';
import collections from '../../db/collections';
import { createResCreator } from '../../helpers/createRes';
import fastify from '../../init';

export default function DELETE() {
  fastify.delete('/board', { onRequest: [authenticate] }, async (req, rep) => {
    const { _id: userID } = await req.jwtVerify();
    const boards = await collections.boards;
    const { _id } = req.body as { _id: string };
    const boardExist = await boards.findOne({ _id: new ObjectId(_id) });

    const createRes = createResCreator(rep);

    if (!boardExist) return createRes(404, 'Board doesn\'t exist');
    if (boardExist.owner != userID) return createRes(401, 'You aren\'t owner of this board');

    boards.deleteOne({ _id: new ObjectId(_id) });

    return createRes(200, 'Board deleted');
  });
}
