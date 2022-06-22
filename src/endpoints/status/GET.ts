import { ObjectId } from 'mongodb';
import fastify from '../../init';
import { createResCreator } from '../../helpers/createRes';
import lazyCollections from '../../db/lazyCollections';

export default function GET() {
  fastify.get('/status/:board', async (req, rep) => {
    const { board: boardID } = req.params as { board: string };
    const createRes = createResCreator(rep);
    const { status, boards } = await lazyCollections();
    const board = await boards.findOne({ _id: new ObjectId(boardID) });

    if (!board) {
      return createRes(404, 'Board don\'t exist');
    }

    const { _id: userID } = await req.jwtVerify();

    if (board.owner != userID) {
      return createRes(401, 'You aren\'t owner of this board');
    }

    const statuses = await status.find({ _board: boardID }).toArray();

    return createRes(200, `Found statuses: ${statuses.length}`, statuses);
  });
}
