import { ApiResponse } from "../success.types";
import { UserAttributes } from "../users.types";

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
