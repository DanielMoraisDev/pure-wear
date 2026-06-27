import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useFilterStore } from "@/stores/useFilterStore";
import { FilterAttributes } from "@/types/filters.types";
import { useSearchParams } from "react-router-dom";

interface FiltersProps {
  filters: FilterAttributes[];
  title: string;
  value: string;
}

const Filter = ({ filters, title, value }: FiltersProps) => {
  // 1. Puxamos o selectedFilters diretamente do Zustand para ler quem está ativo
  const { toggleFilter, selectedFilters } = useFilterStore();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilterChange = (id: number) => {
    const filter = filters.find((filter) => filter.id == id);
    if (!filter) return;

    const filterType = filter.type as "brands" | "categories";

    // Dispara a atualização no Zustand
    toggleFilter({
      id: filter.id,
      type: filterType,
    });

    // Gerencia os Search Params da URL
    const currentCategories = searchParams.get("categories")?.split(",") || [];
    const currentBrands = searchParams.get("brands")?.split(",") || [];

    const filterIdStr = id.toString();
    const targetArray =
      filterType === "categories" ? currentCategories : currentBrands;

    const index = targetArray.indexOf(filterIdStr);
    if (index > -1) {
      targetArray.splice(index, 1);
    } else {
      targetArray.push(filterIdStr);
    }

    const newParams = new URLSearchParams(searchParams);

    if (currentCategories.length > 0) {
      newParams.set("categories", currentCategories.join(","));
    } else {
      newParams.delete("categories");
    }

    if (currentBrands.length > 0) {
      newParams.set("brands", currentBrands.join(","));
    } else {
      newParams.delete("brands");
    }

    setSearchParams(newParams);
  };

  return (
    <>
      <AccordionItem value={value}>
        <AccordionTrigger className="text-sm font-medium">
          {title}
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-3 pt-2">
          {filters.map((filter) => {
            // 2. Descobrimos se este checkbox específico deve estar marcado
            // Ele checa se o ID e o Tipo batem com o que está salvo no Zustand
            const isChecked = selectedFilters.some(
              (item) => item.id === filter.id && item.type === filter.type,
            );

            return (
              <div key={filter.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`filter-${filter.id}`}
                  // 3. Atribui o resultado booleano diretamente aqui
                  checked={isChecked}
                  onCheckedChange={() => handleFilterChange(filter.id)}
                />
                <Label
                  htmlFor={`filter-${filter.id}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {filter.name}
                </Label>
              </div>
            );
          })}
        </AccordionContent>
      </AccordionItem>
    </>
  );
};

export default Filter;
