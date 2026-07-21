import { apiUrl } from "@/components/common/http";
import {
  ShippingGetParams,
  ShippingGetResponse,
} from "@/types/frontend/shippings.types";

import { api } from "@/lib/api";

export const shippingGet = async (
  params: ShippingGetParams,
): Promise<ShippingGetResponse> => {
  const response = await api.get<ShippingGetResponse>(
    apiUrl + `/get-shipping`,
    params,
  );
  return response.data;
};
