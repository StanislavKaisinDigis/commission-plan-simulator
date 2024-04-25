export interface Product {
  id: number;
  name: string;
  price: number;
  categories: number;
}

export interface Order {
  id: number;
  staff_id: number;
  price: number;
  date: string;
}

export interface OrderWithPrice extends Order {
  orderItems: {
    product_id: string;
    quantity: number;
    price: number;
    total: number;
  }[];
  totalSum?: number;
}

export interface Staff {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface CommissionPlan {
  id: number;
  name: string;
  category_id: number;
  commission_percentage: number;
}
