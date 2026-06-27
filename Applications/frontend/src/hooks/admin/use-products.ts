import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { handleApiError } from "@/utils/handle-api-error";
import * as api from "@/services/admin/products";
import {
  FetchGetAllProductParams,
  FetchCreateProductParams,
  FetchUpdateProductParams,
  FetchDeleteProductParams,
  FetchSaveProductImagesParams,
  FetchDeleteProductImageParams,
} from "@/types/admin/products.types";

export function useProduct() {
  const queryClient = useQueryClient();
  const QUERY_KEY = ["admin-products"];

  // --- LISTAR TODOS ---
  const GetAll = (
    params: FetchGetAllProductParams,
    options?: { enabled?: boolean },
  ) => {
    return useQuery({
      queryKey: [...QUERY_KEY, params],
      queryFn: () => api.productGetAll(params).catch(handleApiError),
      enabled: options?.enabled !== false,
      staleTime: 1000 * 60 * 5,
    });
  };

  // --- BUSCAR UM ---
  const GetOne = (productId: string) => {
    return useQuery({
      queryKey: [...QUERY_KEY, productId],
      queryFn: () => api.productGetOne({ productId }).catch(handleApiError),
      enabled: !!productId,
    });
  };

  // --- CRIAR ---
  const Create = () => {
    return useMutation({
      mutationFn: (params: FetchCreateProductParams) =>
        api.productCreate(params),
      onSuccess: (response) => {
        toast.success(response.message || "Produto criado com sucesso!");
        queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      },
      onError: handleApiError,
    });
  };

  // --- ATUALIZAR ---
  const Update = () => {
    return useMutation({
      mutationFn: (params: FetchUpdateProductParams) =>
        api.productUpdate(params),
      onSuccess: (response) => {
        toast.success(response.message || "Produto atualizado!");
        queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      },
      onError: handleApiError,
    });
  };

  // --- DELETAR ---
  const Delete = () => {
    return useMutation({
      mutationFn: (params: FetchDeleteProductParams) =>
        api.productDelete(params),
      onSuccess: (response) => {
        toast.success(response.message || "Produto removido!");
        queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      },
      onError: handleApiError,
    });
  };

  // --- SAVE NEW PRODUCT IMAGES ---
  const SaveProductImages = () => {
    return useMutation({
      mutationFn: (params: FetchSaveProductImagesParams) =>
        api.saveProductImages(params),
      onSuccess: (response) => {
        toast.success(
          response.message || "Imagem do produto adicionado com sucesso!",
        );
        queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      },
      onError: (error) => {
        handleApiError(error);
      },
    });
  };

  // --- CHANGE DEFAULT IMAGE PRODUCT ---
  const ChangeProductDefaultImage = (productId: string, image: string) => {
    return useQuery({
      queryKey: [...QUERY_KEY, productId],
      queryFn: () =>
        api
          .changeProductDefaultImage({ productId, image })
          .catch(handleApiError),
      enabled: !!productId && !!image,
    });
  };

  // --- DELETE IMAGE PRODUCT ---
  const DeleteImageProduct = () => {
    return useMutation({
      mutationFn: (params: FetchDeleteProductImageParams) =>
        api.deleteProductImage(params),
      onSuccess: (response) => {
        toast.success(response.message || "Imagem de produto removido!");
        queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      },
      onError: handleApiError,
    });
  };

  return {
    GetAll,
    GetOne,
    Create,
    Update,
    Delete,
    SaveProductImages,
    ChangeProductDefaultImage,
    DeleteImageProduct,
  };
}
