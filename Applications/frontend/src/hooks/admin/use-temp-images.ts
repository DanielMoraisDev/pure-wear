import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { handleApiError } from "@/utils/handle-api-error";
import * as api from "@/services/admin/temp-images";
import { FetchCreateTempImageParams } from "@/types/admin/temp-images.types";

export function useTempImage() {
  const queryClient = useQueryClient();
  const QUERY_KEY = ["admin-temp-images"];

  const Create = () => {
    return useMutation({
      mutationFn: (params: FetchCreateTempImageParams) =>
        api.tempImageCreate(params),
      onSuccess: (response) => {
        toast.success(response.message || "Imagem carregada com sucesso!");
        queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      },
      onError: (error) => {
        handleApiError(error);
      },
    });
  };

  return { Create };
}
