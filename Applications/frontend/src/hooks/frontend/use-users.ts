import { api } from "@/lib/api";
import {
  userGetProfileDetails,
  userLogin,
  userRegister,
  userUpdate,
} from "@/services/frontend/users";
import { useCustomerStore } from "@/stores/useCustomerStore";
import { ApiErrorResponse } from "@/types/error.types";
import { OrderSaveBody } from "@/types/frontend/orders.types";

import {
  UserGetProfileDetailsParams,
  UserLoginBody,
  UserRegisterBody,
  UserUpdateBody,
} from "@/types/frontend/users.type";
import { handleApiError } from "@/utils/handle-api-error";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUser() {
  const loginCustomer = useCustomerStore((state) => state.login);

  const queryClient = useQueryClient();
  const QUERY_KEY = ["frontend-users"];

  // --- REGISTAR USUÁRIO ---
  const Register = () => {
    return useMutation({
      // Executa função de registro
      mutationFn: (body: UserRegisterBody) =>
        userRegister(body).catch(handleApiError),

      // Feedback em caso de sucesso
      onSuccess: (data) => {
        toast.success(data.message || "Cadastro realizado com sucesso");
      },

      // Feedback em caso de erro
      onError: (error: ApiErrorResponse) => {
        const apiData = error?.response?.data;

        if (apiData?.errors) {
          // Pega o primeiro erro de validação para mostrar no toast de forma amigável
          const firstFieldErrors = Object.values(apiData.errors)[0];
          const firstMessage = firstFieldErrors?.[0];

          toast.error(firstMessage || "Erro de validação nos dados enviados.");
          return;
        }

        // Caso seja um erro genérico com mensagem do servidor ou um fallback
        const errorMessage = apiData?.message || "Erro ao realizar o cadastro.";
        toast.error(errorMessage);
      },
    });
  };

  // --- LOGIN DE USUÁRIO ---
  const Login = () => {
    return useMutation({
      // Executa função de registro
      mutationFn: (body: UserLoginBody) =>
        userLogin(body).catch(handleApiError),

      // Feedback em caso de sucesso
      onSuccess: (data) => {
        const userData = {
          token: data.token,
          id: data.id, // Se a API retornar dentro de um objeto 'user'
          name: data.name,
        };

        loginCustomer(userData);
        toast.success("Login realizado com sucesso");
      },

      // Feedback em caso de erro
      onError: (error: ApiErrorResponse) => {
        const apiData = error?.response?.data;

        if (apiData?.errors) {
          // Pega o primeiro erro de validação para mostrar no toast de forma amigável
          const firstFieldErrors = Object.values(apiData.errors)[0];
          const firstMessage = firstFieldErrors?.[0];

          toast.error(firstMessage || "Erro de validação nos dados enviados.");
          return;
        }

        // Caso seja um erro genérico com mensagem do servidor ou um fallback
        const errorMessage = apiData?.message || "Erro ao realizar o login.";
        toast.error(errorMessage);
      },
    });
  };

  // --- UPDATE DE USUÁRIO ---
  const UpdateProfile = () => {
    return useMutation({
      // Executa função de registro
      mutationFn: (body: UserUpdateBody) =>
        userUpdate(body).catch(handleApiError),

      // Feedback em caso de sucesso
      onSuccess: (data) => {
        toast.success(data.message || "Pedido realizado com sucesso");
      },

      // Feedback em caso de erro
      onError: (error: ApiErrorResponse) => {
        const apiData = error?.response?.data;

        if (apiData?.errors) {
          // Pega o primeiro erro de validação para mostrar no toast de forma amigável
          const firstFieldErrors = Object.values(apiData.errors)[0];
          const firstMessage = firstFieldErrors?.[0];

          toast.error(firstMessage || "Erro de validação nos dados enviados.");
          return;
        }

        // Caso seja um erro genérico com mensagem do servidor ou um fallback
        const errorMessage =
          apiData?.message || "Erro ao realizar o atualização de perfil.";
        toast.error(errorMessage);
      },
    });
  };

  // --- GET PROFILE DETAILS ---
  const GetProfileDetails = (
    params: UserGetProfileDetailsParams,
    options?: { enabled?: boolean },
  ) => {
    return useQuery({
      queryKey: [...QUERY_KEY, "one", params],
      queryFn: () => userGetProfileDetails(params).catch(handleApiError),
      enabled: options?.enabled !== false,
      staleTime: 1000 * 60 * 5,
    });
  };

  return {
    Register,
    Login,
    UpdateProfile,
    GetProfileDetails,
  };
}
