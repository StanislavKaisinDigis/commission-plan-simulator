import { db } from "../db";
import { Product } from "../models/model";

async function getProducts() {
  const collection = db.collection("products");
  const pipeline = [
    {
      $lookup: {
        from: "categories",
        localField: "category_id",
        foreignField: "id",
        as: "category",
      },
    },
    {
      $project: {
        _id: 1,
        id: 1,
        name: 1,
        price: 1,
        imageUrl: 1,
        category: { $first: "$category.name" },
      },
    },
  ];
  const products = await collection.aggregate(pipeline).toArray();
  return products as Product[];
}

export default getProducts;
