import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { handleApiError } from "@/utils/handle-api-error";
import * as api from "@/services/admin/orders";
import {
  FetchGetAllOrdersParams,
  FetchGetOneOrdersParams,
} from "@/types/admin/orders.types";

export function useOrder() {
  const queryClient = useQueryClient();
  const QUERY_KEY = ["admin-orders"];

  // --- LISTAR TODOS ---
  const GetAll = (
    params: FetchGetAllOrdersParams,
    options?: { enabled?: boolean },
  ) => {
    return useQuery({
      queryKey: [...QUERY_KEY, params],
      queryFn: () => api.orderGetAll(params).catch(handleApiError),
      enabled: options?.enabled !== false,
      staleTime: 1000 * 60 * 5,
    });
  };

  // --- BUSCAR UM ---
  const GetOne = (
    params: FetchGetOneOrdersParams,
    options?: { enabled?: boolean },
  ) => {
    return useQuery({
      queryKey: [...QUERY_KEY, params],
      queryFn: () => api.orderGetOne(params).catch(handleApiError),
      enabled: options?.enabled !== false,
      staleTime: 1000 * 60 * 5,
    });
  };

  return { GetAll, GetOne };
}
