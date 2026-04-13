import axios from "axios";
import { useAdminStore } from "@/stores/useAdminStore"; // Importe o store correto
import { apiUrl } from "@/components/common/http";

export const api = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});

// Interceptor de Requisição: Adiciona o Token em todas as chamadas
api.interceptors.request.use((config) => {
  // Acessa o estado atual do store
  const adminInfo = useAdminStore.getState().adminInfo;

  // Como o seu JSON mostra que o token está dentro de adminInfo
  const token = adminInfo?.token;

  if (token && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Interceptor de Resposta Simplificado:
// Apenas para tratar erros globais (como forçar logout se o token for inválido)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Se receber 401 (Não autorizado), limpa o store e desloga
    if (error.response?.status === 401) {
      useAdminStore.getState().logout();
      // Opcional: window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);
