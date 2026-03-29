import { Skeleton } from "@/components/ui/skeleton";

const CartItemSkeleton = () => {
  return (
    <div className="flex items-start gap-4 w-full">
      <Skeleton className="w-28 aspect-[9/16] rounded-sm flex-shrink-0" />

      <div className="flex flex-1 flex-col gap-1">
        <div className="flex justify-between items-start">
          <Skeleton className="h-4 w-[60%]" />
          <Skeleton className="h-4 w-[15%]" />
        </div>

        <Skeleton className="h-3 w-full mt-1" />

        {/* Simulação dos controles de quantidade + Badge de Tamanho */}
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2 border rounded-md p-1">
            <Skeleton className="h-7 w-7 rounded-md" />
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-7 w-7 rounded-md" />
          </div>
          <Skeleton className="h-6 w-16 rounded" />
        </div>
      </div>

      <Skeleton className="h-9 w-9 rounded-md flex-shrink-0" />
    </div>
  );
};

export default CartItemSkeleton;
