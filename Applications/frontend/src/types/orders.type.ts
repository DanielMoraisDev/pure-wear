export type PaymentStatus = "not paid" | "paid";
export type Status = "pending" | "shipped" | "delivered" | "cancelled";

export interface Order {
  id: number;
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
  payment_status: PaymentStatus;
  status: Status;
  created_at: Date;
}
