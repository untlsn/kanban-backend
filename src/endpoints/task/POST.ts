import { ObjectId } from 'mongodb';
import fastify from '../../init';
import lazyCollections from '../../db/lazyCollections';
import { createResCreator } from '../../helpers/createRes';

interface Body {
  title: string,
  status: number,
  board: string,
  desc?: string,
  subtasks?: {
    title: string,
    done: boolean
  }[]
}

export default function POST() {
  fastify.post('/task', async (req, rep) => {
    const body = req.body as Body;
    const createRes = createResCreator(rep);

    if (!body.title) {
      return createRes(400, 'Missing title');
    }
    if (body.status == undefined) {
      return createRes(400, 'Missing status');
    }
    if (!body.board) {
      return createRes(400, 'Missing board id');
    }
    if (body.subtasks && !body.subtasks.every((sub) => sub.title)) {
      return createRes(400, 'Missing title in one of subtasks');
    }

    const { _id: userID } = await req.jwtVerify();
    const { tasks, boards } = await lazyCollections();

    const board = await boards.findOne({ _id: new ObjectId(body.board) });

    if (board?.owner != userID) {
      return createRes(401, 'You aren\'t owner of this board');
    }

    const task = await tasks.insertOne({
      title: body.title,
      desc: body.desc || '',
      status: body.status,
      _board: body.board,
      subtasks: body.subtasks.map((sub) => ({ title: sub.title, done: !!sub.done })),
    });

    return createRes(200, 'Task created', { _id: task.insertedId });
  });
}
