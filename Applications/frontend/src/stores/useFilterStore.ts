import { create } from "zustand";

export type SelectedFilter = {
  id: number;
  type: "brands" | "categories";
};

export type SearchParamsObject = {
  categories?: number[];
  brands?: number[];
};

interface FilterState {
  selectedFilters: SelectedFilter[];
  toggleFilter: (filter: SelectedFilter) => void;
  clearFilters: () => void;
  search: SearchParamsObject;
  setFiltersFromURL: (categories: number[], brands: number[]) => void;
}

const generateSearchParams = (
  filters: SelectedFilter[],
): SearchParamsObject => {
  const categories = filters
    .filter((f) => f.type === "categories")
    .map((f) => f.id);

  const brands = filters.filter((f) => f.type === "brands").map((f) => f.id);

  return {
    categories, // Agora é number[] (ex: [1, 2, 3] ou [])
    brands, // Agora é number[] (ex: [4, 5] ou [])
  };
};

export const useFilterStore = create<FilterState>((set, get) => ({
  selectedFilters: [],
  search: {
    categories: [],
    brands: [],
  },

  toggleFilter: (filter) =>
    set((state) => {
      // Correção sutil: valida se existe combinando ID E TYPE (evita bugs se uma marca e categoria tiverem o mesmo ID)
      const exists = state.selectedFilters.some(
        (item) => item.id === filter.id && item.type === filter.type,
      );

      const nextFilters = exists
        ? state.selectedFilters.filter(
            (item) => !(item.id === filter.id && item.type === filter.type),
          )
        : [...state.selectedFilters, filter];

      return {
        selectedFilters: nextFilters,
        search: generateSearchParams(nextFilters),
      };
    }),

  // 3. Corrigido para limpar o objeto search também
  clearFilters: () =>
    set({
      selectedFilters: [],
      search: {
        categories: [],
        brands: [],
      },
    }),

  setFiltersFromURL: (categories, brands) => {
    const categoryFilters: SelectedFilter[] = categories.map((id) => ({
      id,
      type: "categories",
    }));

    const brandFilters: SelectedFilter[] = brands.map((id) => ({
      id,
      type: "brands",
    }));

    const nextFilters = [...categoryFilters, ...brandFilters];

    set({
      selectedFilters: nextFilters,
      search: {
        categories,
        brands,
      },
    });
  },
}));
