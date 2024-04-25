import { Request, Response } from "express";
import getProducts from "../services/products.service";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await getProducts();
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Error fetching products" });
  }
};
