import axios from "axios";
import { useAdminStore } from "@/stores/useAdminStore";
import { useCustomerStore } from "@/stores/useCustomerStore";
import { apiUrl } from "@/components/common/http";

export const api = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const customerInfo = useCustomerStore.getState().customerInfo;
  const adminInfo = useAdminStore.getState().adminInfo;

  const token = customerInfo?.token || adminInfo?.token;

  if (token && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const customerInfo = useCustomerStore.getState().customerInfo;
      const adminInfo = useAdminStore.getState().adminInfo;

      if (customerInfo?.token) {
        useCustomerStore.getState().logout();
      } else if (adminInfo?.token) {
        useAdminStore.getState().logout();
      }
    }

    return Promise.reject(error);
  },
);
