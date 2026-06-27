import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AdminData {
  token: string;
  id: number;
  name: string;
}

interface AdminStore {
  adminInfo: AdminData | null;
  login: (data: any) => void;
  logout: () => void;
}

export const useAdminStore = create<AdminStore>()(
  persist(
    (set) => ({
      adminInfo: null, // Estado inicial

      login: (data) => set({ adminInfo: data }),

      logout: () => {
        set({ adminInfo: null });
        // O persist já remove do localStorage automaticamente ao setar null
      },
    }),
    {
      name: "adminInfo", // Nome da chave no localStorage
    },
  ),
);
