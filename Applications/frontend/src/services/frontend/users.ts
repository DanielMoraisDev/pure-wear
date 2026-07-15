import { apiUrl } from "@/components/common/http";
import { api } from "@/lib/api";
import {
  UserRegisterBody,
  UserRegisterResponse,
} from "@/types/frontend/users.type";

export const userRegister = async (
  body: UserRegisterBody,
): Promise<UserRegisterResponse> => {
  const response = await api.post<UserRegisterResponse>(
    `${apiUrl}/register`,
    body,
  );

  return response.data;
};
