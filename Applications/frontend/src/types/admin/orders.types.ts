import { Order, PaymentStatus, Status } from "../orders.type";

export interface FetchGetAllOrdersParams {}

export interface GetAllOrdersResponse {
  data: {
    id: number;
    name: string;
    email: string;
    grand_total: number;
    created_at: Date;
    payment_status: PaymentStatus;
    status: Status;
  };
  status: number;
}

export interface FetchGetOneOrdersParams {
  orderId: string;
}

export interface GetOneOrdersResponse {
  data: Order;
  status: number;
}
