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

import axios from "axios";

export const categoryCreate = async (
  params: FetchCreateCategoryParams,
): Promise<FetchCreateCategoryResponse> => {
  const response = await axios.post<FetchCreateCategoryResponse>(
    apiUrl + `/categories`,
    params,
  );
  return response.data;
};

export const categoryGetAll = async (
  params: FetchGetAllCategoryParams,
): Promise<FetchGetAllCategoryResponse> => {
  const response = await axios.get<FetchGetAllCategoryResponse>(
    apiUrl + `/categories`,
    params,
  );
  return response.data;
};

export const categoryGetOne = async (
  params: FetchGetOneCategoryParams,
): Promise<FetchGetOneCategoryResponse> => {
  const response = await axios.get<FetchGetOneCategoryResponse>(
    apiUrl + `/categories/${params.categoryId}`,
  );
  return response.data;
};

export const categoryDelete = async (
  params: FetchDeleteCategoryParams,
): Promise<FetchDeleteCategoryResponse> => {
  const response = await axios.delete<FetchDeleteCategoryResponse>(
    apiUrl + `/categories/${params.categoryId}`,
  );
  return response.data;
};

export const categoryUpdate = async (
  params: FetchUpdateCategoryParams,
): Promise<FetchUpdateCategoryResponse> => {
  const response = await axios.put<FetchUpdateCategoryResponse>(
    apiUrl + `/categories/${params.categoryId}`,
    params,
  );
  return response.data;
};
