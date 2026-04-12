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

const Filters = () => {
  const { selectedFilters } = useFilterStore();

  const filters = {
    categories: [
      { id: "cat_1", name: "Men", slug: "men" },
      { id: "cat_2", name: "Women", slug: "women" },
      { id: "cat_3", name: "Kids", slug: "kids" },
    ],
    brands: [
      { id: "b1", name: "Urban Style" },
      { id: "b2", name: "Classic Fit" },
      { id: "b3", name: "EcoWear" },
      { id: "b4", name: "SportX" },
    ],
  };

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Gera um número entre 1000ms (1s) e 2000ms (2s)
    const randomDelay = Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000;

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, randomDelay);
  }, []);

  return (
    <div className="w-full md:w-[90%] p-4 border rounded-lg bg-card text-card-foreground ">
      <h2 className="text-lg font-semibold mb-4 tracking-tight">Filters</h2>

      <Accordion type="multiple" defaultValue={["categories", "brands"]}>
        {/* Seção de Categorias */}

        {isLoading ? (
          <FilterSkeleton itemsCount={5} />
        ) : (
          <Filter
            title="Categorias"
            value="categories"
            filters={filters.categories.map((f) => ({
              ...f,
              type: "categories",
            }))}
          />
        )}

        {/* Seção de Marcas */}

        {isLoading ? (
          <FilterSkeleton itemsCount={5} />
        ) : (
          <Filter
            title="Brands"
            value="brands"
            filters={filters.brands.map((f) => ({
              ...f,
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
