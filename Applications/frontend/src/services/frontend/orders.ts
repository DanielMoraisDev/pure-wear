import { apiUrl } from "@/components/common/http";
import { api } from "@/lib/api";
import { OrderSaveBody } from "@/types/frontend/orders.types";
import { ApiResponse } from "@/types/success.types";

export const orderSave = async (body: OrderSaveBody): Promise<ApiResponse> => {
  const response = await api.post<ApiResponse>("/save-order", body);

  return response.data;
};
