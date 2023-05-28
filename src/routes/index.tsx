import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { routeLoader$ } from '@builder.io/qwik-city';
import * as mongoDB from "mongodb";

export class User {
  constructor(
    public id: number,
    public name: string,
    ) {}
}

export const collections: { users?: mongoDB.Collection } = {}

export async function connectToDatabase(connection_string: string, db_name: string, collection_name: string) {

  const client: mongoDB.MongoClient = new mongoDB.MongoClient(connection_string);

  await client.connect();

  const db: mongoDB.Db = client.db(db_name);

  const appsCollection: mongoDB.Collection = db.collection(collection_name);

  collections.users = appsCollection;
}


export const useGetUsers = routeLoader$(async (context) => {
  if (collections.users === undefined) {
    const connection_string = context.env.get('DB_CONN_STRING');
    const db_name = context.env.get('DB_NAME');
    const collection_name = context.env.get('COLLECTION_NAME');
    if(connection_string === undefined || db_name === undefined || collection_name === undefined){
      throw new Error('Environment variables missing (DB_CONN_STRING, DB_NAME, COLLECTION_NAME');
    }
    await connectToDatabase(connection_string, db_name, collection_name);
  }

  const data = await collections.users!.find({}, { projection: { '_id': 0 } }).toArray() as unknown as User[];
  return data;
});

export default component$(() => {
  const users = useGetUsers();
  return (
    <>
     {users.value.map((u)=> {
        return (<div key={u.id}>id: {u.id}, name: {u.name}</div>)
     })}
    </>
  );
});

export const head: DocumentHead = {
  title: 'Welcome to Qwik',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
