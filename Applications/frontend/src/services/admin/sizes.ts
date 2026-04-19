import { apiUrl } from "@/components/common/http";
import {
  FetchGetAllSizeParams,
  FetchGetAllSizeResponse,
} from "@/types/admin/sizes.types";

import { api } from "@/lib/api";

export const sizeGetAll = async (
  params: FetchGetAllSizeParams,
): Promise<FetchGetAllSizeResponse> => {
  const response = await api.get<FetchGetAllSizeResponse>(apiUrl + `/sizes`);
  return response.data;
};
