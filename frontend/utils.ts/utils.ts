import { OrderWithPrice } from "../models/model";

export const priceToNumber = (price: string): number => {
  return Number(price.replace(/[^0-9.-]+/g, ""));
};

export function convertDate(dateString: string): Date | null {
  const [dayString, monthString, yearString] = dateString.split(".");
  const day = parseInt(dayString, 10);
  const month = parseInt(monthString, 10) - 1;
  const year = parseInt(yearString, 10);
  if (
    isNaN(day) ||
    isNaN(month) ||
    isNaN(year) ||
    day < 1 ||
    day > 31 ||
    month < 0 ||
    month > 11
  ) {
    return null;
  }
  const date = new Date(year, month, day);
  if (isNaN(date.getTime())) {
    return null;
  }
  return date;
}

export function calculateCommission(
  orders: OrderWithPrice[],
  selectedProductIds: string[],
  commissionPerProduct: string,
  staffId: number
) {
  if (!selectedProductIds.length || !staffId) {
    return { ordersWithComissions: [], totalCommissionSum: 0, totalOrders: 0 };
  }
  let ordersWithComissions = [];
  let totalCommissionSum = 0;
  let totalOrders = 0;

  for (const order of orders) {
    let orderCommissionSum = 0;

    for (const item of order.orderItems) {
      const productId = item.product_id;
      if (
        selectedProductIds.includes(productId.toString()) ||
        selectedProductIds.includes(productId)
      ) {
        console.log("item :>> ", item);
        console.log("productId :>> ", productId);
        const commission =
          (item.quantity * (item.price * +commissionPerProduct)) / 100;
        orderCommissionSum += commission;
      }
    }
    order.orderCommissionSum = orderCommissionSum;

    totalCommissionSum += orderCommissionSum;
    totalOrders = totalOrders + order.orderItems.length;
  }
  orders.sort((a, b) => {
    if (!convertDate(a.date) || !convertDate(a.date)) return;
    return convertDate(a.date).getTime() - convertDate(b.date).getTime();
  });
  ordersWithComissions = orders;

  return { ordersWithComissions, totalCommissionSum, totalOrders };
}

export function formatDateRange(data: { start: Date; end: Date }) {
  try {
    const startDate = new Date(data.start);
    const endDate = new Date(data.end);

    const formattedStart = startDate.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    const formattedEnd = endDate.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    return `${formattedStart} - ${formattedEnd}`;
  } catch (error) {
    console.error("Error formatting date range:", error);
    return "Invalid Date Range";
  }
}
