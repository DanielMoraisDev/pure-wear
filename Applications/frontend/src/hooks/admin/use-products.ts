import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { handleApiError } from "@/utils/handle-api-error";
import * as api from "@/services/admin/products";
import {
  FetchGetAllProductParams,
  FetchCreateProductParams,
  FetchUpdateProductParams,
  FetchDeleteProductParams,
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
        toast.success(response.message || "Marca criada com sucesso!");
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
        toast.success(response.message || "Marca atualizada!");
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
        toast.success(response.message || "Marca removida!");
        queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      },
      onError: handleApiError,
    });
  };

  return { GetAll, GetOne, Create, Update, Delete };
}
