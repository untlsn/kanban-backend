import { ObjectId } from 'mongodb';
import fastify from '../../init';
import lazyCollections from '../../db/lazyCollections';
import { createResCreator } from '../../helpers/createRes';

interface Body {
  _id: string
}

export default function DELETE() {
  fastify.delete('/task', async (req, rep) => {
    const body = req.body as Body;
    const { _id: userID } = await req.jwtVerify();
    const { tasks, boards } = await lazyCollections();
    const createRes = createResCreator(rep);

    const query = { _id: new ObjectId(body._id) };

    const task = await tasks.findOne(query);

    if (!task) {
      return createRes(404, 'Task don\'t exist');
    }

    const board = await boards.findOne({ _id: new ObjectId(task._board) });

    if (board?.owner != userID) {
      return createRes(401, 'You aren\'t owner of this board');
    }

    tasks.deleteOne(query);

    return createRes(200, 'Task deleted');
  });
}
