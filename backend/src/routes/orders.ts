import { Request, Response } from "express";
import getOrders from "../services/orders.service";

interface OrderQuery {
  staff_id: string;
  start_date: string;
  end_date: string;
  productId?: number;
  commission?: number;
}

export const getOrdersDyIdAndDate = async (
  req: Request<{}, {}, OrderQuery>,
  res: Response
) => {
  const staffId = req.query.staff_id;
  const startDate = req.query.start_date;
  const endDate = req.query.end_date;

  if (!staffId || !startDate || !endDate) {
    return res
      .status(400)
      .json({ message: "Missing required query parameters" });
  }

  try {
    const orders = await getOrders(
      staffId as unknown as number,
      new Date(startDate as unknown as string).toISOString(),
      new Date(endDate as unknown as string).toISOString()
    );
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Error fetching orders" });
  }
};
