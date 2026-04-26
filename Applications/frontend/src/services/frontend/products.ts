import { apiUrl } from "@/components/common/http";
import { api } from "@/lib/api";
import {
  FetchGetAllFeaturedProductParams,
  FetchGetAllFeaturedProductResponse,
  FetchGetAllLatestProductParams,
  FetchGetAllLatestProductResponse,
} from "@/types/frontend/products.types";

export const productGetAllFeatured = async (
  params: FetchGetAllFeaturedProductParams,
): Promise<FetchGetAllFeaturedProductResponse> => {
  const response = await api.get<FetchGetAllFeaturedProductResponse>(
    apiUrl + `/get-featured-products`,
    params,
  );
  return response.data;
};

export const productGetAllLatest = async (
  params: FetchGetAllLatestProductParams,
): Promise<FetchGetAllLatestProductResponse> => {
  const response = await api.get<FetchGetAllLatestProductResponse>(
    apiUrl + `/get-latest-products`,
    params,
  );
  return response.data;
};
