import { MongoClient } from "mongodb";

// const url = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@sg01.yuoqn.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`
const url = process.env.MONGO_URL

const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function connect() {
  if (!client.isConnected()) await client.connect();
  const db = client.db(process.env.DATABASE_NAME);
  return { db, client };
}

export { connect };
