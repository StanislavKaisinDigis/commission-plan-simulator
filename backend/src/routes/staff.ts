import { Request, Response } from "express";
import getStaff from "../services/staff.service";

export const getAllStaff = async (req: Request, res: Response) => {
  try {
    const staff = await getStaff();
    res.json(staff);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Error fetching products" });
  }
};
