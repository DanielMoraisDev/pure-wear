import { UserAttributes } from "../users.types";

export interface UserRegisterBody {
  name: string;
  email: string;
  password: string;
}

export interface UserRegisterResponse {
  status: number;
  message: string;
  errors?: string;
}
