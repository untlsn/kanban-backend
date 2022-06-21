import { Collection } from 'mongodb';
import { User } from './documents';
import getDb from './getDb';

const collections = {
  get users(): Promise<Collection<User>> {
    return getDb().then((db) => db.collection('users'));
  },
};

export default collections;
