import { ApiResponse } from "../success.types";
import { UserAlterAttributes, UserAttributes } from "../users.types";

export interface UserRegisterBody {
  name: string;
  email: string;
  password: string;
}

export interface UserLoginBody {
  email: string;
  password: string;
}

export interface UserLoginResponse {
  status: string;
  token: string;
  id: number;
  name: string;
}

export interface UserUpdateBody {
  name?: string;
  email?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  mobile?: string;
}

export interface UserUpdateResponse extends ApiResponse {
  data: UserAttributes;
}

export interface UserGetProfileDetailsParams {}

export interface UserGetProfileDetailsResponse extends ApiResponse {
  data: UserAlterAttributes;
}
