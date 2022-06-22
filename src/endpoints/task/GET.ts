import { ObjectId } from 'mongodb';
import fastify from '../../init';
import lazyCollections from '../../db/lazyCollections';
import { createResCreator } from '../../helpers/createRes';

export default function GET() {
  // Title, desc, status and all subtasks
  fastify.get('/task/:id', async (req, rep) => {
    const { tasks, boards } = await lazyCollections();
    const { id } = req.params as { id: string };
    const createRes = createResCreator(rep);

    const task = await tasks.findOne({ _id: new ObjectId(id) });

    if (!task) {
      return createRes(404, 'Task dont exist');
    }

    const board = await boards.findOne({ _id: new ObjectId(task._board) });

    const { _id: userID } = await req.jwtVerify();

    if (board.owner != userID) {
      return createRes(401, 'You aren\'t owner of this board');
    }

    return createRes(200, 'Task exist', task);
  });

  // Only title, status and subtasks counts
  fastify.get('/many-task/:board', async (req, rep) => {
    const { board: boardID } = req.params as { board: string };
    const { tasks, boards } = await lazyCollections();
    const createRes = createResCreator(rep);
    const board = await boards.findOne({ _id: new ObjectId(boardID) });

    if (!board) {
      return createRes(404, 'Board don\'t exist');
    }

    const { _id: userID } = await req.jwtVerify();

    if (board.owner != userID) {
      return createRes(401, 'You aren\'t owner of this board');
    }

    const findTasks = await tasks.find({ _board: boardID }).toArray();

    return createRes(
      200,
      `Find tasks: ${findTasks.length}`,
      findTasks,
    );
  });
}
