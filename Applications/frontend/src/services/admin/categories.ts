import { apiUrl } from "@/components/common/http";
import {
  FetchCreateCategoryParams,
  FetchCreateCategoryResponse,
  FetchDeleteCategoryParams,
  FetchDeleteCategoryResponse,
  FetchGetAllCategoryParams,
  FetchGetAllCategoryResponse,
  FetchGetOneCategoryParams,
  FetchGetOneCategoryResponse,
  FetchUpdateCategoryParams,
  FetchUpdateCategoryResponse,
} from "@/types/admin/categories.types";

import { api } from "@/lib/api";

export const categoryCreate = async (
  params: FetchCreateCategoryParams,
): Promise<FetchCreateCategoryResponse> => {
  const response = await api.post<FetchCreateCategoryResponse>(
    apiUrl + `/categories`,
    params,
  );
  return response.data;
};

export const categoryGetAll = async (
  params: FetchGetAllCategoryParams,
): Promise<FetchGetAllCategoryResponse> => {
  const response = await api.get<FetchGetAllCategoryResponse>(
    apiUrl + `/categories`,
    params,
  );
  return response.data;
};

export const categoryGetOne = async (
  params: FetchGetOneCategoryParams,
): Promise<FetchGetOneCategoryResponse> => {
  const response = await api.get<FetchGetOneCategoryResponse>(
    apiUrl + `/categories/${params.categoryId}`,
  );
  return response.data;
};

export const categoryDelete = async (
  params: FetchDeleteCategoryParams,
): Promise<FetchDeleteCategoryResponse> => {
  const response = await api.delete<FetchDeleteCategoryResponse>(
    apiUrl + `/categories/${params.categoryId}`,
  );
  return response.data;
};

export const categoryUpdate = async (
  params: FetchUpdateCategoryParams,
): Promise<FetchUpdateCategoryResponse> => {
  const response = await api.put<FetchUpdateCategoryResponse>(
    apiUrl + `/categories/${params.categoryId}`,
    params,
  );
  return response.data;
};
