import { Collection } from 'mongodb';
import {
  Board, User, Task, Status,
} from './documents';
import getDb from './getDb';

export default async function lazyCollections() {
  const db = await getDb();

  return {
    get users(): Collection<User> {
      return db.collection('users');
    },
    get boards(): Collection<Board> {
      return db.collection('boards');
    },
    get tasks(): Collection<Task> {
      return db.collection('tasks');
    },
    get status(): Collection<Status> {
      return db.collection('status');
    },
  };
}
