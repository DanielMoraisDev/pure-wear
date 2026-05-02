import { apiUrl } from "@/components/common/http";
import { api } from "@/lib/api";
import {
  FetchGetAllCategoryParams,
  FetchGetAllCategoryResponse,
} from "@/types/frontend/categories.types";

export const categoryGetAll = async (
  params: FetchGetAllCategoryParams,
): Promise<FetchGetAllCategoryResponse> => {
  const response = await api.get<FetchGetAllCategoryResponse>(
    apiUrl + `/get-brands`,
    params,
  );
  return response.data;
};
