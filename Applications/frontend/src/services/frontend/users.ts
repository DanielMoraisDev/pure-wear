import { apiUrl } from "@/components/common/http";
import { api } from "@/lib/api";
import {
  UserGetProfileDetailsParams,
  UserGetProfileDetailsResponse,
  UserLoginBody,
  UserLoginResponse,
  UserRegisterBody,
  UserUpdateBody,
  UserUpdateResponse,
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

export const userUpdate = async (
  body: UserUpdateBody,
): Promise<UserUpdateResponse> => {
  const response = await api.put<UserUpdateResponse>(
    `${apiUrl}/update-profile`,
    body,
  );

  return response.data;
};

export const userGetProfileDetails = async (
  params: UserGetProfileDetailsParams,
): Promise<UserGetProfileDetailsResponse> => {
  const response = await api.get<UserGetProfileDetailsResponse>(
    apiUrl + `/get-account-details`,
    params,
  );
  return response.data;
};
