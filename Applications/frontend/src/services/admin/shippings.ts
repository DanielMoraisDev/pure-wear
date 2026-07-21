import { apiUrl } from "@/components/common/http";
import {
  ShippingUpdateBody,
  ShippingUpdateResponse,
  ShippingGetParams,
  ShippingGetResponse,
} from "@/types/admin/shippings.types";

import { api } from "@/lib/api";

export const shippingUpdate = async (
  body: ShippingUpdateBody,
): Promise<ShippingUpdateResponse> => {
  const response = await api.post<ShippingUpdateResponse>(
    apiUrl + `/save-shipping-charge`,
    body,
  );
  return response.data;
};

export const shippingGet = async (
  params: ShippingGetParams,
): Promise<ShippingGetResponse> => {
  const response = await api.get<ShippingGetResponse>(
    apiUrl + `/shipping-charges`,
    params,
  );
  return response.data;
};
