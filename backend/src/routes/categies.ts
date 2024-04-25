import { Request, Response } from "express";
import getCategories from "../services/categies.service";

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await getCategories();
    res.json(categories);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Error fetching categories" });
  }
};
