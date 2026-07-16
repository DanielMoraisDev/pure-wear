import { apiUrl } from "@/components/common/http";
import { api } from "@/lib/api";
import {
  UserLoginBody,
  UserLoginResponse,
  UserRegisterBody,
} from "@/types/frontend/users.type";
import { ApiResponse } from "@/types/success.types";

export const userRegister = async (
  body: UserRegisterBody,
): Promise<ApiResponse> => {
  const response = await api.post<ApiResponse>(`${apiUrl}/register`, body);

  return response.data;
};

export const userLogin = async (
  body: UserLoginBody,
): Promise<UserLoginResponse> => {
  const response = await api.post<UserLoginResponse>(`${apiUrl}/login`, body);

  return response.data;
};
