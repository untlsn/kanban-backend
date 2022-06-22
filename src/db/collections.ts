import { Collection } from 'mongodb';
import {
  Board, User, Task,
} from './documents';
import getDb from './getDb';

function getCollection(name: string): any {
  return getDb().then((db) => db.collection(name));
}

const collections = {
  get users(): Promise<Collection<User>> {
    return getCollection('users');
  },
  get boards(): Promise<Collection<Board>> {
    return getCollection('boards');
  },
  get tasks(): Promise<Collection<Task>> {
    return getCollection('tasks');
  },
};

export default collections;
