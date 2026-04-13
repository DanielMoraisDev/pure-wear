import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { handleApiError } from "@/utils/handle-api-error";
import * as api from "@/services/admin/brands";
import {
  FetchGetAllBrandParams,
  FetchCreateBrandParams,
  FetchUpdateBrandParams,
  FetchDeleteBrandParams,
} from "@/types/admin/brands.types";

export function useBrand() {
  const queryClient = useQueryClient();
  const QUERY_KEY = ["admin-brands"];

  // --- LISTAR TODOS ---
  const GetAll = (
    params: FetchGetAllBrandParams,
    options?: { enabled?: boolean },
  ) => {
    return useQuery({
      queryKey: [...QUERY_KEY, params],
      queryFn: () => api.brandGetAll(params).catch(handleApiError),
      enabled: options?.enabled !== false,
      staleTime: 1000 * 60 * 5,
    });
  };

  // --- BUSCAR UM ---
  const GetOne = (brandId: string) => {
    return useQuery({
      queryKey: [...QUERY_KEY, brandId],
      queryFn: () => api.brandGetOne({ brandId }).catch(handleApiError),
      enabled: !!brandId,
    });
  };

  // --- CRIAR ---
  const Create = () => {
    return useMutation({
      mutationFn: (params: FetchCreateBrandParams) => api.brandCreate(params),
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
      mutationFn: (params: FetchUpdateBrandParams) => api.brandUpdate(params),
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
      mutationFn: (params: FetchDeleteBrandParams) => api.brandDelete(params),
      onSuccess: (response) => {
        toast.success(response.message || "Marca removida!");
        queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      },
      onError: handleApiError,
    });
  };

  return { GetAll, GetOne, Create, Update, Delete };
}
