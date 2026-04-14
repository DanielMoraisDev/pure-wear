import { apiUrl } from "@/components/common/http";
import {
  FetchChangeProductDefaultImageParams,
  FetchChangeProductDefaultImageResponse,
  FetchCreateProductParams,
  FetchCreateProductResponse,
  FetchDeleteProductParams,
  FetchDeleteProductResponse,
  FetchGetAllProductParams,
  FetchGetAllProductResponse,
  FetchGetOneProductParams,
  FetchGetOneProductResponse,
  FetchSaveProductImagesParams,
  FetchSaveProductImagesResponse,
  FetchUpdateProductParams,
  FetchUpdateProductResponse,
} from "@/types/admin/products.types";

import { api } from "@/lib/api";

export const productCreate = async (
  params: FetchCreateProductParams,
): Promise<FetchCreateProductResponse> => {
  const response = await api.post<FetchCreateProductResponse>(
    apiUrl + `/products`,
    params,
  );
  return response.data;
};

export const productGetAll = async (
  params: FetchGetAllProductParams,
): Promise<FetchGetAllProductResponse> => {
  const response = await api.get<FetchGetAllProductResponse>(
    apiUrl + `/products`,
    params,
  );
  return response.data;
};

export const productGetOne = async (
  params: FetchGetOneProductParams,
): Promise<FetchGetOneProductResponse> => {
  const response = await api.get<FetchGetOneProductResponse>(
    apiUrl + `/products/${params.productId}`,
  );
  return response.data;
};

export const productDelete = async (
  params: FetchDeleteProductParams,
): Promise<FetchDeleteProductResponse> => {
  const response = await api.delete<FetchDeleteProductResponse>(
    apiUrl + `/products/${params.productId}`,
  );
  return response.data;
};

export const productUpdate = async (
  params: FetchUpdateProductParams,
): Promise<FetchUpdateProductResponse> => {
  const response = await api.put<FetchUpdateProductResponse>(
    apiUrl + `/products/${params.productId}`,
    params,
  );
  return response.data;
};

export const saveProductImages = async (
  params: FetchSaveProductImagesParams,
): Promise<FetchSaveProductImagesResponse> => {
  const response = await api.post<FetchSaveProductImagesResponse>(
    apiUrl + `/save-product-images`,
    params,
  );
  return response.data;
};

export const changeProductDefaultImage = async (
  params: FetchChangeProductDefaultImageParams,
): Promise<FetchChangeProductDefaultImageResponse> => {
  const response = await api.get<FetchChangeProductDefaultImageResponse>(
    apiUrl + `/change-product-default-image`,
    {
      params: {
        product_id: params.productId,
        image: params.image,
      },
    },
  );
  return response.data;
};
