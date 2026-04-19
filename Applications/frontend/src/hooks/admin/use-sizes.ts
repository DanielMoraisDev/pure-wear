import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { handleApiError } from "@/utils/handle-api-error";
import * as api from "@/services/admin/sizes";
import { FetchGetAllSizeParams } from "@/types/admin/sizes.types";

export function useSize() {
  const queryClient = useQueryClient();
  const QUERY_KEY = ["admin-sizes"];

  // --- LISTAR TODOS ---
  const GetAll = (
    params: FetchGetAllSizeParams,
    options?: { enabled?: boolean },
  ) => {
    return useQuery({
      queryKey: [...QUERY_KEY, params],
      queryFn: () => api.sizeGetAll(params).catch(handleApiError),
      enabled: options?.enabled !== false,
      staleTime: 1000 * 60 * 5,
    });
  };

  return {
    GetAll,
  };
}
