import { ObjectId } from 'mongodb';
import authenticate from '../../authenticate';
import { createResCreator } from '../../helpers/createRes';
import fastify from '../../init';
import { Status } from '../../db/documents';
import lazyCollections from '../../db/lazyCollections';

export default function POST() {
  fastify.post('/status/', { onRequest: [authenticate] }, async (req, rep) => {
    const { _id } = await req.jwtVerify();
    const { boards, status } = await lazyCollections();
    const { statuses, _board } = req.body as Status;
    const createRes = createResCreator(rep);

    const board = await boards.findOne({
      _id: new ObjectId(_board),
    });

    if (!board) {
      return createRes(404, 'Board don\'t exist');
    }
    if (board.owner != _id) {
      return createRes(401, 'You aren\'t owner of this board');
    }

    status.insertOne({
      statuses,
      _board,
    });

    return createRes(201, 'Status created');
  });
}
