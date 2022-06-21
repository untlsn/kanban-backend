import { ObjectId } from 'mongodb';
import authenticate from '../../authenticate';
import collections from '../../db/collections';
import { createResCreator } from '../../helpers/createRes';
import fastify from '../../init';

export default function PATCH() {
  fastify.patch('/board', { onRequest: [authenticate] }, async (req, rep) => {
    const { _id: userID } = await req.jwtVerify();
    const boards = await collections.boards;
    const { name, _id } = req.body as { name: string, _id: string };

    const createRes = createResCreator(rep);
    const boardExist = await boards.findOne({ _id: new ObjectId(_id) });

    if (!boardExist) return createRes(404, 'Board doesn\'t exist');
    if (boardExist.owner != userID) return createRes(401, 'You aren\'t owner of this board');

    boards.updateOne(
      { _id: new ObjectId(_id) },
      { $set: { name } },
    );

    return createRes(200, 'Board updated');
  });
}
