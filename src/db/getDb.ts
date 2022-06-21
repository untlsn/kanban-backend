import { MongoClient } from 'mongodb';

const uri = 'mongodb://localhost:27017';

export default async function getDb() {
  const client = new MongoClient(uri);
  await client.connect();

  return client.db('kanban');
}
