import { MongoClient } from "mongodb";

const DB_NAME = process.env.DB_NAME || "db";

//dev env
// const uri = `mongodb://localhost:27017/${DB_NAME}`;
//docker env
const uri = `mongodb://mongo:27017/${DB_NAME}`;

const client = new MongoClient(uri, {});

async function connectDb() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

export const db = client.db(DB_NAME);

connectDb();
