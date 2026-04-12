import { create } from "zustand";

export type SelectedFilter = {
  id: string;
  name: string;
  type: string;
};

interface FilterState {
  selectedFilters: SelectedFilter[];
  toggleFilter: (filter: SelectedFilter) => void;
  clearFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  selectedFilters: [],

  toggleFilter: (filter) =>
    set((state) => {
      const exists = state.selectedFilters.some(
        (item) => item.id === filter.id,
      );

      return {
        selectedFilters: exists
          ? state.selectedFilters.filter((item) => item.id !== filter.id)
          : [...state.selectedFilters, filter],
      };
    }),

  clearFilters: () => set({ selectedFilters: [] }),
}));
