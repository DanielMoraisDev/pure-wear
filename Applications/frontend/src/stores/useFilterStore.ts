import { create } from "zustand";

export type SelectedFilter = {
  id: number;
  name: string;
  type: "brands" | "categories";
};

export type SearchParamsObject = {
  categories?: string;
  brands?: string;
};

interface FilterState {
  selectedFilters: SelectedFilter[];
  toggleFilter: (filter: SelectedFilter) => void;
  clearFilters: () => void;
  search: SearchParamsObject;
}

const generateSearchParams = (
  filters: SelectedFilter[],
): SearchParamsObject => {
  const catChecked = filters
    .filter((f) => f.type === "categories")
    .map((f) => f.id);

  const brandChecked = filters
    .filter((f) => f.type === "brands")
    .map((f) => f.id);

  // Se houver itens, junta com vírgula codificada, senão retorna string vazia ""
  return {
    categories:
      catChecked.length > 0 ? encodeURIComponent(catChecked.join(",")) : "",
    brands:
      brandChecked.length > 0 ? encodeURIComponent(brandChecked.join(",")) : "",
  };
};

export const useFilterStore = create<FilterState>((set, get) => ({
  selectedFilters: [],
  search: {
    categories: "",
    brands: "",
  },

  toggleFilter: (filter) =>
    set((state) => {
      const exists = state.selectedFilters.some(
        (item) => item.id === filter.id,
      );

      const nextFilters = exists
        ? state.selectedFilters.filter((item) => item.id !== filter.id)
        : [...state.selectedFilters, filter];

      return {
        selectedFilters: nextFilters,
        search: generateSearchParams(nextFilters),
      };
    }),

  clearFilters: () => set({ selectedFilters: [] }),
}));
