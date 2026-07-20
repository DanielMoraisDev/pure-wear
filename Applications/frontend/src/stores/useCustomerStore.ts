import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CustomerData {
  token: string;
  id: number;
  name: string;
}

interface CustomerStore {
  customerInfo: CustomerData | null;
  login: (data: CustomerData) => void;
  logout: () => void;
}

export const useCustomerStore = create<CustomerStore>()(
  persist(
    (set) => ({
      customerInfo: null, // Estado inicial

      login: (data) => set({ customerInfo: data }),

      logout: () => {
        set({ customerInfo: null });
        // O persist já remove do localStorage automaticamente ao setar null
      },
    }),
    {
      name: "customerInfo", // Nome da chave no localStorage
    },
  ),
);
