import { Collection } from 'mongodb';
import { Board, User } from './documents';
import getDb from './getDb';

const collections = {
  get users(): Promise<Collection<User>> {
    return getDb().then((db) => db.collection('users'));
  },
  get boards(): Promise<Collection<Board>> {
    return getDb().then((db) => db.collection('boards'));
  },
};

export default collections;
