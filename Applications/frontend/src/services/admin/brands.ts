import { apiUrl } from "@/components/common/http";
import {
  FetchCreateBrandParams,
  FetchCreateBrandResponse,
  FetchDeleteBrandParams,
  FetchDeleteBrandResponse,
  FetchGetAllBrandParams,
  FetchGetAllBrandResponse,
  FetchGetOneBrandParams,
  FetchGetOneBrandResponse,
  FetchUpdateBrandParams,
  FetchUpdateBrandResponse,
} from "@/types/admin/brands.types";

import { api } from "@/lib/api";

export const brandCreate = async (
  params: FetchCreateBrandParams,
): Promise<FetchCreateBrandResponse> => {
  const response = await api.post<FetchCreateBrandResponse>(
    apiUrl + `/brands`,
    params,
  );
  return response.data;
};

export const brandGetAll = async (
  params: FetchGetAllBrandParams,
): Promise<FetchGetAllBrandResponse> => {
  const response = await api.get<FetchGetAllBrandResponse>(
    apiUrl + `/brands`,
    params,
  );
  return response.data;
};

export const brandGetOne = async (
  params: FetchGetOneBrandParams,
): Promise<FetchGetOneBrandResponse> => {
  const response = await api.get<FetchGetOneBrandResponse>(
    apiUrl + `/brands/${params.brandId}`,
  );
  return response.data;
};

export const brandDelete = async (
  params: FetchDeleteBrandParams,
): Promise<FetchDeleteBrandResponse> => {
  const response = await api.delete<FetchDeleteBrandResponse>(
    apiUrl + `/brands/${params.brandId}`,
  );
  return response.data;
};

export const brandUpdate = async (
  params: FetchUpdateBrandParams,
): Promise<FetchUpdateBrandResponse> => {
  const response = await api.put<FetchUpdateBrandResponse>(
    apiUrl + `/brands/${params.brandId}`,
    params,
  );
  return response.data;
};
