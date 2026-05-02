import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { handleApiError } from "@/utils/handle-api-error";
import * as api from "@/services/frontend/categories";
import { FetchGetAllCategoryParams } from "@/types/frontend/categories.types";

export function useCategory() {
  const queryClient = useQueryClient();
  const QUERY_KEY = ["frontend-categories"];

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

  return {
    GetAll,
  };
}
