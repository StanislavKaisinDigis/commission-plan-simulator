import { Card, DataTable } from "@shopify/polaris";
import React, { useMemo } from "react";
import { OrderWithPrice } from "../models/model";

interface Props {
  orders: OrderWithPrice[];
  totalOrders: number;
  totalCommissionSum: number;
}

export const ResultsTable: React.FC<Props> = ({
  orders,
  totalOrders,
  totalCommissionSum,
}) => {
  const rows = orders.map((order) => {
    return [
      order.date,
      order.orderItems.length,
      `$${order.orderCommissionSum.toFixed(2)}`,
    ];
  });

  return (
    <Card>
      <DataTable
        columnContentTypes={["text", "numeric", "numeric"]}
        headings={["Date", "Orders count", "Sum commissions"]}
        rows={rows}
        totals={["", totalOrders, `$${totalCommissionSum.toFixed(2)}`]}
      />
    </Card>
  );
};
