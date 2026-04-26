import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { handleApiError } from "@/utils/handle-api-error";
import * as api from "@/services/frontend/products";
import {
  FetchGetAllFeaturedProductParams,
  FetchGetAllLatestProductParams,
} from "@/types/frontend/products.types";

export function useProduct() {
  const queryClient = useQueryClient();
  const QUERY_KEY = ["frontend-products"];

  // --- LISTAR TODOS OS DESTAQUES ---
  const GetAllFeatured = (
    params: FetchGetAllFeaturedProductParams,
    options?: { enabled?: boolean },
  ) => {
    return useQuery({
      queryKey: [...QUERY_KEY, "featured", params],
      queryFn: () => api.productGetAllFeatured(params).catch(handleApiError),
      enabled: options?.enabled !== false,
      staleTime: 1000 * 60 * 5,
    });
  };

  // --- LISTAR TODOS OS ULTIMOS ---
  const GetAllLatest = (
    params: FetchGetAllLatestProductParams,
    options?: { enabled?: boolean },
  ) => {
    return useQuery({
      queryKey: [...QUERY_KEY, "latest", params],
      queryFn: () => api.productGetAllLatest(params).catch(handleApiError),
      enabled: options?.enabled !== false,
      staleTime: 1000 * 60 * 5,
    });
  };

  return {
    GetAllFeatured,
    GetAllLatest,
  };
}
