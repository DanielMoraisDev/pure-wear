import { Order, PaymentStatus, Status } from "../orders.type";

export interface FetchGetAllOrdersParams {}

export interface GetAllOrdersResponse {
  data: Order[];
  status: number;
}

export interface FetchGetOneOrdersParams {
  orderId: string;
}

export interface GetOneOrdersResponse {
  data: Order;
  status: number;
}
