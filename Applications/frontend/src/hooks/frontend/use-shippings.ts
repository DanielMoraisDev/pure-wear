import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { handleApiError } from "@/utils/handle-api-error";
import { ShippingGetParams } from "@/types/frontend/shippings.types";
import { shippingGet } from "@/services/frontend/shippings";

export function useShipping() {
  const queryClient = useQueryClient();
  const QUERY_KEY = ["front-shippings"];

  // --- CAPTURAR ---
  const Get = (params: ShippingGetParams, options?: { enabled?: boolean }) => {
    return useQuery({
      queryKey: [...QUERY_KEY, params],
      queryFn: () => shippingGet(params).catch(handleApiError),
      enabled: options?.enabled !== false,
      staleTime: 1000 * 60 * 5,
    });
  };
  return { Get };
}
