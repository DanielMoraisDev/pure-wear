import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { handleApiError } from "@/utils/handle-api-error";
import * as api from "@/services/admin/shippings";
import {
  ShippingGetParams,
  ShippingUpdateBody,
} from "@/types/admin/shippings.types";
import { shippingUpdate } from "@/services/admin/shippings";
import { shippingGet } from "@/services/admin/shippings";

export function useShipping() {
  const queryClient = useQueryClient();
  const QUERY_KEY = ["admin-shippings"];

  // --- CAPTURAR ---
  const Get = (params: ShippingGetParams, options?: { enabled?: boolean }) => {
    return useQuery({
      queryKey: [...QUERY_KEY, params],
      queryFn: () => shippingGet(params).catch(handleApiError),
      enabled: options?.enabled !== false,
      staleTime: 1000 * 60 * 5,
    });
  };

  // --- ATUALIZAR ---
  const Update = () => {
    return useMutation({
      mutationFn: (params: ShippingUpdateBody) => shippingUpdate(params),
      onSuccess: (response) => {
        toast.success("Taxa de envio atualizada!");
        queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      },
      onError: handleApiError,
    });
  };

  return { Get, Update };
}
