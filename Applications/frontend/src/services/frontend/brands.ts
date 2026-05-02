import { apiUrl } from "@/components/common/http";
import { api } from "@/lib/api";
import {
  FetchGetAllBrandParams,
  FetchGetAllBrandResponse,
} from "@/types/frontend/brands.types";

export const brandGetAll = async (
  params: FetchGetAllBrandParams,
): Promise<FetchGetAllBrandResponse> => {
  const response = await api.get<FetchGetAllBrandResponse>(
    apiUrl + `/get-brands`,
    params,
  );
  return response.data;
};
