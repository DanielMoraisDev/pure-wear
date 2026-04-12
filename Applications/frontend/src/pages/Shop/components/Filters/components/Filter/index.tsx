import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useFilterStore } from "@/stores/useFilterStore";
import { FilterAttributes } from "@/types/filters.types";

interface FiltersProps {
  filters: FilterAttributes[];
  title: string;
  value: string;
}

const Filter = ({ filters, title, value }: FiltersProps) => {
  const { toggleFilter } = useFilterStore();

  const handleFilterChange = (id: string, name: string, type: string) => {
    const filter = filters.find((filter) => filter.id == id);
    toggleFilter({ id: filter.id, name: filter.name, type: filter.type });
  };
  return (
    <>
      <AccordionItem value={value}>
        <AccordionTrigger className="text-sm font-medium">
          {title}
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-3 pt-2">
          {filters.map((filter) => (
            <div key={filter.id} className="flex items-center space-x-2">
              <Checkbox
                id={filter.id}
                onCheckedChange={() =>
                  handleFilterChange(filter.id, filter.name, filter.type)
                }
              />
              <Label
                htmlFor={filter.id}
                className="text-sm font-normal cursor-pointer"
              >
                {filter.name}
              </Label>
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
    </>
  );
};

export default Filter;
