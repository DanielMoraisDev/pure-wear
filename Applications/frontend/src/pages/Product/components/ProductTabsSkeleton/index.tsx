import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProductTabsSkeleton = () => {
  return (
    <section className="px-5 md:px-32 mt-16 animate-pulse">
      <div className="w-full">
        {/* Mock do TabsList */}
        <div className="flex border-b w-full justify-start gap-10 h-14 items-center">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-32" />
        </div>

        <div className="py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Coluna de Texto */}
            <div className="space-y-6">
              <Skeleton className="h-8 w-3/4" /> {/* Título */}
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
              {/* Lista de Benefícios */}
              <div className="space-y-3 pt-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                ))}
              </div>
            </div>

            {/* Card de Citação Lateral */}
            <div className="bg-slate-50 rounded-2xl p-8 border border-dashed border-slate-200 h-40 flex flex-col justify-center">
              <Skeleton className="h-4 w-full mb-4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductTabsSkeleton;
