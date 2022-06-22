import { ObjectId } from 'mongodb';
import authenticate from '../../authenticate';
import { createResCreator } from '../../helpers/createRes';
import fastify from '../../init';
import lazyCollections from '../../db/lazyCollections';

export default function DELETE() {
  fastify.delete('/board/:_id', { onRequest: [authenticate] }, async (req, rep) => {
    const { _id: userID } = await req.jwtVerify();
    const { boards, tasks } = await lazyCollections();
    const { _id } = req.params as { _id: string };
    const boardExist = await boards.findOne({ _id: new ObjectId(_id) });

    const createRes = createResCreator(rep);

    if (!boardExist) return createRes(404, 'Board doesn\'t exist');
    if (boardExist.owner != userID) return createRes(401, 'You aren\'t owner of this board');

    boards.deleteOne({ _id: new ObjectId(_id) });
    tasks.deleteMany({ _board: _id });

    return createRes(200, 'Board deleted');
  });
}
