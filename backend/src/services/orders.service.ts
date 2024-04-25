import { db } from "../db";
import { OrderWithPrice } from "../models/model";

async function getOrders(staffId: number, startDate: string, endDate: string) {
  const collection = db.collection("orders");
  const query = {
    staff_id: +staffId,
    date: { $gte: startDate, $lte: endDate },
  };
  const orders = await collection.find(query).toArray();

  const productIds: Array<number> = [
    ...new Set(
      orders.flatMap((order) =>
        order.orderItems.map((item: { product_id: string }) => item.product_id)
      )
    ),
  ];

  const productPrices = (await db
    .collection("products")
    .find({ id: { $in: productIds } })
    .toArray()) as unknown as Array<{ id: string; price: number }>;

  const priceMap = productPrices.reduce(
    (
      acc: { [key: string]: number },
      product: { id: string; price: number }
    ) => {
      acc[product.id] = product.price;
      return acc;
    },
    {}
  );

  const ordersWithPrice: OrderWithPrice[] = orders.map((order: any) => {
    const enrichedOrderItems = order.orderItems.map(
      (item: { product_id: string; quantity: number }) => {
        const productPrice = priceMap[item.product_id];
        return {
          ...item,
          price: productPrice,
          total: productPrice ? productPrice * item.quantity : undefined,
        };
      }
    );
    const totalSum = enrichedOrderItems.reduce(
      (acc: number, item: { total?: number }) => acc + (item.total || 0),
      0
    );

    return { ...order, orderItems: enrichedOrderItems, totalSum };
  });

  const ordersGroupedByDays = groupOrdersByDay(ordersWithPrice);

  return ordersGroupedByDays;
}

export default getOrders;

function groupOrdersByDay(orders: OrderWithPrice[]): {
  date: string;
  orderItems: OrderWithPrice["orderItems"];
  totalSum: number;
}[] {
  const groupedOrders = orders.reduce(
    (
      acc: {
        [key: string]: {
          date: string;
          orderItems: OrderWithPrice["orderItems"];
          totalSum: number;
        };
      },
      order: OrderWithPrice
    ) => {
      const orderDate = new Date(order.date).toLocaleDateString();
      if (!acc[orderDate]) {
        acc[orderDate] = {
          date: orderDate,
          orderItems: [],
          totalSum: 0,
        };
      }

      acc[orderDate].orderItems.push(...order.orderItems);
      acc[orderDate].totalSum += order.totalSum || 0;

      return acc;
    },
    {}
  );

  return Object.values(groupedOrders);
}
