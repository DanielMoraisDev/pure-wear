import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { handleApiError } from "@/utils/handle-api-error";
import * as api from "@/services/admin/categories";
import {
  FetchGetAllCategoryParams,
  FetchCreateCategoryParams,
  FetchUpdateCategoryParams,
  FetchDeleteCategoryParams,
} from "@/types/admin/categories.types";

export function useCategory() {
  const queryClient = useQueryClient();
  const QUERY_KEY = ["admin-categories"];

  // --- LISTAR TODOS ---
  const GetAll = (
    params: FetchGetAllCategoryParams,
    options?: { enabled?: boolean },
  ) => {
    return useQuery({
      queryKey: [...QUERY_KEY, params],
      queryFn: () => api.categoryGetAll(params).catch(handleApiError),
      enabled: options?.enabled !== false,
      staleTime: 1000 * 60 * 5,
    });
  };

  // --- BUSCAR UM ---
  const GetOne = (categoryId: string) => {
    return useQuery({
      queryKey: [...QUERY_KEY, categoryId],
      queryFn: () => api.categoryGetOne({ categoryId }).catch(handleApiError),
      enabled: !!categoryId,
    });
  };

  // --- CRIAR ---
  const Create = () => {
    return useMutation({
      mutationFn: (params: FetchCreateCategoryParams) =>
        api.categoryCreate(params),
      onSuccess: (response) => {
        toast.success(response.message || "Categoria criada com sucesso!");
        queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      },
      onError: handleApiError,
    });
  };

  // --- ATUALIZAR ---
  const Update = () => {
    return useMutation({
      mutationFn: (params: FetchUpdateCategoryParams) =>
        api.categoryUpdate(params),
      onSuccess: (response) => {
        toast.success(response.message || "Categoria atualizada!");
        queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      },
      onError: handleApiError,
    });
  };

  // --- DELETAR ---
  const Delete = () => {
    return useMutation({
      mutationFn: (params: FetchDeleteCategoryParams) =>
        api.categoryDelete(params),
      onSuccess: (response) => {
        toast.success(response.message || "Categoria removida!");
        queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      },
      onError: handleApiError,
    });
  };

  return { GetAll, GetOne, Create, Update, Delete };
}
