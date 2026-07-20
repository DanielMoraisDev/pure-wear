import { apiUrl } from "@/components/common/http";
import { api } from "@/lib/api";
import {
  FetchGetAllOrdersParams,
  FetchGetOneOrdersParams,
  GetAllOrdersResponse,
  GetOneOrdersResponse,
  OrderSaveBody,
} from "@/types/frontend/orders.types";
import { ApiResponse } from "@/types/success.types";

export const orderSave = async (body: OrderSaveBody): Promise<ApiResponse> => {
  const response = await api.post<ApiResponse>("/save-order", body);

  return response.data;
};

export const orderGetAll = async (
  params: FetchGetAllOrdersParams,
): Promise<GetAllOrdersResponse> => {
  const response = await api.get<GetAllOrdersResponse>(
    apiUrl + `/get-orders`,
    params,
  );
  return response.data;
};

export const orderGetOne = async (
  params: FetchGetOneOrdersParams,
): Promise<GetOneOrdersResponse> => {
  const response = await api.get<GetOneOrdersResponse>(
    apiUrl + `/get-order-details/${params.orderId}`,
  );
  return response.data;
};
