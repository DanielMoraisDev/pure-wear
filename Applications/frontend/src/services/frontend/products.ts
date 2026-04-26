import { apiUrl } from "@/components/common/http";
import { api } from "@/lib/api";
import { FetchGetAllProductResponse } from "@/types/admin/products.types";
import { FetchGetAllProductParams } from "@/types/frontend/products.types";

export const productGetAllFeatured = async (
  params: FetchGetAllProductParams,
): Promise<FetchGetAllProductResponse> => {
  const response = await api.get<FetchGetAllProductResponse>(
    apiUrl + `/get-featured-products`,
    params,
  );
  return response.data;
};
