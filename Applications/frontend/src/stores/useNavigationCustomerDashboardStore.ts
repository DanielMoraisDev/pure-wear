import { create } from "zustand";

export type NavCustomerDashboardItem = "dashboard" | "orders" | "profile";

interface NavigationCustomerDashboardState {
  activeItem: string;
  setActiveItem: (item: string) => void;
}

export const useNavigationCustomerDashboardStore =
  create<NavigationCustomerDashboardState>((set) => ({
    activeItem: "dashboard",
    setActiveItem: (item) => set({ activeItem: item }),
  }));
