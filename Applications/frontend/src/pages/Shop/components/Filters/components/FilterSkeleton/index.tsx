import { Skeleton } from "@/components/ui/skeleton";
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

interface FilterSkeletonProps {
  itemsCount?: number;
}

const FilterSkeleton = ({ itemsCount = 4 }: FilterSkeletonProps) => {
  return (
    <AccordionItem value="skeleton" className="border-b-0">
      {/* Simula o Trigger do Accordion */}
      <div className="flex items-center justify-between py-4">
        <Skeleton className="h-4 w-24" /> {/* Título do Filtro */}
        <Skeleton className="h-4 w-4 rounded-full" /> {/* Ícone da seta */}
      </div>

      <div className="flex flex-col gap-3 pt-2 pb-4">
        {/* Gera uma lista de itens de filtro falsos */}
        {Array.from({ length: itemsCount }).map((_, i) => (
          <div key={i} className="flex items-center space-x-2">
            <Skeleton className="h-4 w-4 rounded" /> {/* Checkbox */}
            <Skeleton className="h-4 w-32" /> {/* Label */}
          </div>
        ))}
      </div>
    </AccordionItem>
  );
};

export default FilterSkeleton;
