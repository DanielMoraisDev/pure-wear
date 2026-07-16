import { api } from "@/lib/api";
import { userLogin, userRegister } from "@/services/frontend/users";
import { useCostumerStore } from "@/stores/useCostumerStore";
import { ApiErrorResponse } from "@/types/error.types";

import { UserLoginBody, UserRegisterBody } from "@/types/frontend/users.type";
import { handleApiError } from "@/utils/handle-api-error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUser() {
  const loginCostumer = useCostumerStore((state) => state.login);

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

        loginCostumer(userData);
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

  return {
    Register,
    Login,
  };
}
function loginStore(arg0: {
  token: string;
  id: any; // Se a API retornar dentro de um objeto 'user'
  name: any;
}) {
  throw new Error("Function not implemented.");
}
