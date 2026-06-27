"use client";

import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import FilterItem from "./components/Filter";
import { useFilterStore } from "@/stores/useFilterStore";
import Filter from "./components/Filter";
import FilterSkeleton from "./components/FilterSkeleton";
import { useCategory } from "@/hooks/frontend/use-categories";
import { useBrand } from "@/hooks/frontend/use-brands";

const Filters = () => {
  const { selectedFilters } = useFilterStore();
  const { GetAll: GetAllCategory } = useCategory();
  const { data: categories, isLoading: isLoadingCategories } = GetAllCategory(
    {},
  );

  const { GetAll: GetAllBrand } = useBrand();
  const { data: brands, isLoading: isLoadingBrands } = GetAllBrand({});

  const filters = {
    categories: categories?.data,
    brands: categories?.data,
  };

  return (
    <div className="w-full md:w-[90%] p-4 border rounded-lg bg-card text-card-foreground ">
      <h2 className="text-lg font-semibold mb-4 tracking-tight">Filters</h2>

      <Accordion type="multiple" defaultValue={["categories", "brands"]}>
        {/* Seção de Categorias */}

        {isLoadingCategories ? (
          <FilterSkeleton itemsCount={5} />
        ) : (
          <Filter
            title="Categorias"
            value="categories"
            filters={filters?.categories?.map((f) => ({
              id: String(f.id),
              name: f.name,
              type: "categories",
            }))}
          />
        )}

        {/* Seção de Marcas */}

        {isLoadingBrands ? (
          <FilterSkeleton itemsCount={5} />
        ) : (
          <Filter
            title="Brands"
            value="brands"
            filters={filters.brands.map((f) => ({
              id: String(f.id),
              name: f.name,
              type: "brands",
            }))}
          />
        )}
      </Accordion>

      {/* Debug para ver o que está selecionado */}
      <div className="mt-6 pt-4 border-t text-xs text-muted-foreground">
        Ativos:{" "}
        {selectedFilters.length > 0 ? (
          selectedFilters.map((f, i) => (
            <span key={f.id} className="text-xs">
              {f.name}
              {selectedFilters.length - 1 > i ? ", " : null}
            </span>
          ))
        ) : (
          <span>Nenhum</span>
        )}
      </div>
    </div>
  );
};

export default Filters;
