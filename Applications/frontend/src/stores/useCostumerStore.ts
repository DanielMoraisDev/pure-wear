import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CostumerData {
  token: string;
  id: number;
  name: string;
}

interface CostumerStore {
  costumerInfo: CostumerData | null;
  login: (data: CostumerData) => void;
  logout: () => void;
}

export const useCostumerStore = create<CostumerStore>()(
  persist(
    (set) => ({
      costumerInfo: null, // Estado inicial

      login: (data) => set({ costumerInfo: data }),

      logout: () => {
        set({ costumerInfo: null });
        // O persist já remove do localStorage automaticamente ao setar null
      },
    }),
    {
      name: "costumerInfo", // Nome da chave no localStorage
    },
  ),
);
