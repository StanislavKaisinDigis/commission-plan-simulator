import { OrderWithPrice, Product } from "../../models/model";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export async function fetchOrders(
  staffId: string,
  startDate: Date,
  endDate: Date
): Promise<OrderWithPrice[]> {
  const url = new URL("/orders", BASE_URL);

  const params = {
    staff_id: staffId,
    start_date: startDate.toUTCString(),
    end_date: endDate.toUTCString(),
  };

  url.search = new URLSearchParams(params).toString();

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error(`Failed to fetch orders: ${response.statusText}`);
  }

  const orders = await response.json();
  return orders as OrderWithPrice[];
}

export async function fetchProducts(): Promise<Product[]> {
  const productsUrl = `${BASE_URL}/products`;
  const producstResponse = await fetch(productsUrl, {
    mode: "no-cors",
  });
  if (!producstResponse.ok) {
    throw new Error(`Failed to fetch products: ${producstResponse.statusText}`);
  }
  return producstResponse.json();
}

export async function fetchStaff(): Promise<Product[]> {
  const staffUrl = `${BASE_URL}/staff`;
  const staffResponse = await fetch(staffUrl, {
    mode: "no-cors",
  });
  if (!staffResponse.ok) {
    throw new Error(`Failed to fetch products: ${staffResponse.statusText}`);
  }
  return await staffResponse.json();
}

export async function fetchCategories(): Promise<Product[]> {
  const url = `${BASE_URL}/categories`;
  const response = await fetch(url, {
    mode: "no-cors",
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`);
  }
  return await response.json();
}
