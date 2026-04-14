import { apiUrl } from "@/components/common/http";
import { api } from "@/lib/api";
import {
  FetchCreateTempImageParams,
  FetchCreateTempImageResponse,
} from "@/types/admin/temp-images.types";

export const tempImageCreate = async (
  params: FetchCreateTempImageParams,
): Promise<FetchCreateTempImageResponse> => {
  const response = await api.post<FetchCreateTempImageResponse>(
    apiUrl + `/temp-images`,
    params,
  );
  return response.data;
};
