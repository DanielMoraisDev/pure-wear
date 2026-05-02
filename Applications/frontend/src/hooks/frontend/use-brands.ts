import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { handleApiError } from "@/utils/handle-api-error";
import * as api from "@/services/frontend/brands";
import { FetchGetAllBrandParams } from "@/types/frontend/brands.types";

export function useBrand() {
  const queryClient = useQueryClient();
  const QUERY_KEY = ["frontend-brands"];

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

  return {
    GetAll,
  };
}
