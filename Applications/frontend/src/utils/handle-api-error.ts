import { AxiosError } from "axios";
import { toast } from "sonner";

interface ApiError {
  status: number;
  message?: string;
  errors?: {
    [key: string]: string[];
  };
}

export const handleApiError = (error: unknown) => {
  const axiosError = error as AxiosError<ApiError>;
  const responseData = axiosError?.response?.data;

  console.log(responseData);

  if (responseData?.errors) {
    // Erros de validação (array de mensagens)
    Object.values(responseData.errors).forEach((messages) => {
      messages.forEach((msg) => toast.error(msg));
    });
  } else if (responseData?.message) {
    // Mensagens simples (404, 403, etc)
    toast.error(responseData.message);
  } else {
    // Erro genérico (queda de conexão, 500 sem mensagem, etc)
    toast.error(axiosError.message || "Ocorreu um erro inesperado.");
  }

  // Re-lança para o React Query saber que deu erro
  throw error;
};
