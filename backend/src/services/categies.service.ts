import { db } from "../db";

async function getCategories() {
  const collection = db.collection("categories");
  const categories = await collection.find().toArray();
  return categories;
}

export default getCategories;
