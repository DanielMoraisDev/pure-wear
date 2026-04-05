import { create } from "zustand";

export type NavAdminDashboardItem =
  | "dashboard"
  | "categories"
  | "brands"
  | "products"
  | "orders"
  | "users";

interface NavigationAdminDashboardState {
  activeItem: string;
  setActiveItem: (item: string) => void;
}

export const useNavigationAdminDashboardStore =
  create<NavigationAdminDashboardState>((set) => ({
    activeItem: "dashboard",
    setActiveItem: (item) => set({ activeItem: item }),
  }));
