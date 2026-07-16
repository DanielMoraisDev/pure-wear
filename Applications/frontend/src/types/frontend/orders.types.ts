export interface FetchGetAllCategoryParams {}

export interface OrderSaveCartItem {
  product_id: number;
  name: string;
  qty: number;
  price: number;
  unit_price: number;
  size: string;
}

export interface OrderSaveBody {
  name: string;
  email: string;
  city: string;
  state: string;
  zip: string;
  address: string;
  mobile: string;
  grand_total: number;
  sub_total: number;
  shipping: number;
  cart: OrderSaveCartItem[];
}
