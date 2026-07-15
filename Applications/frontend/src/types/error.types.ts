import { AxiosError } from "axios";

// A estrutura exata que o seu Laravel retorna em caso de falha
export interface ApiValidationError {
  status: number;
  message?: string;
  errors?: Record<string, string[]>;
}

// Um helper type para facilitar o uso do AxiosError com o nosso formato
export type ApiErrorResponse = AxiosError<ApiValidationError>;
