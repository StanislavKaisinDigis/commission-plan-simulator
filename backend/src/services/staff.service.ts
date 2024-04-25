import { db } from "../db";

async function getStaff() {
  const collection = db.collection("staff");
  const orders = await collection.find().toArray();
  return orders;
}

export default getStaff;
