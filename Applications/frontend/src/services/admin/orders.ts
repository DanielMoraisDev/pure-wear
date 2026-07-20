import { apiUrl } from "@/components/common/http";
import { api } from "@/lib/api";
import {
  FetchGetAllOrdersParams,
  FetchGetOneOrdersParams,
  GetAllOrdersResponse,
  GetOneOrdersResponse,
  UpdateOrderParams,
  UpdateOrderResponse,
} from "@/types/admin/orders.types";

export const orderGetAll = async (
  params: FetchGetAllOrdersParams,
): Promise<GetAllOrdersResponse> => {
  const response = await api.get<GetAllOrdersResponse>(
    apiUrl + `/orders`,
    params,
  );
  return response.data;
};

export const orderGetOne = async (
  params: FetchGetOneOrdersParams,
): Promise<GetOneOrdersResponse> => {
  const response = await api.get<GetOneOrdersResponse>(
    apiUrl + `/orders/${params.orderId}`,
  );
  return response.data;
};

export const orderUpdate = async (
  params: UpdateOrderParams,
): Promise<UpdateOrderResponse> => {
  const response = await api.post<UpdateOrderResponse>(
    apiUrl + `/update-order/${params.orderId}`,
    params,
  );
  return response.data;
};
