export interface Product {
  _id: string;
  id: number;
  name: string;
  price: string;
  imageUrl: string;
  category: string;
}

export interface Order {
  id: number;
  staff_id: number;
  price: number;
  date: string;
}

export interface OrderWithPrice extends Order {
  date: string;
  orderItems: {
    product_id: string;
    quantity: number;
    price: number;
    total: number;
  }[];
  totalSum?: number;
  orderCommissionSum?: number;
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

export interface SelectedStaff {
  staffId: number;
  start: Date;
  end: Date;
}
