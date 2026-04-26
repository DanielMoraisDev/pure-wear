import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { handleApiError } from "@/utils/handle-api-error";
import * as api from "@/services/frontend/products";
import { FetchGetAllProductParams } from "@/types/frontend/products.types";

export function useProduct() {
  const queryClient = useQueryClient();
  const QUERY_KEY = ["frontend-products"];

  // --- LISTAR TODOS ---
  const GetAllFeatured = (
    params: FetchGetAllProductParams,
    options?: { enabled?: boolean },
  ) => {
    return useQuery({
      queryKey: [...QUERY_KEY, params],
      queryFn: () => api.productGetAllFeatured(params).catch(handleApiError),
      enabled: options?.enabled !== false,
      staleTime: 1000 * 60 * 5,
    });
  };

  return {
    GetAllFeatured,
  };
}
