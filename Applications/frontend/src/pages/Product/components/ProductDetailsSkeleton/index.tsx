import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

const ProductDetailsSkeleton = () => {
  return (
    <main className="grid grid-cols-1 lg:grid-cols-2 gap-12 px-5 md:px-32 animate-pulse">
      {/* Galeria de Imagens Skeleton */}
      <div className="flex flex-col-reverse md:flex-row gap-4">
        {/* Miniaturas */}
        <div className="flex md:flex-col gap-3 overflow-x-hidden pb-2">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="min-w-[85px] h-[110px] rounded-lg" />
          ))}
        </div>

        {/* Imagem Principal (Mantendo o aspect-[3/4]) */}
        <div className="flex-1 aspect-[3/4] rounded-2xl overflow-hidden">
          <Skeleton className="w-full h-full" />
        </div>
      </div>

      {/* Detalhes do Produto Skeleton */}
      <div className="flex flex-col gap-8">
        <div className="space-y-4">
          {/* Título */}
          <Skeleton className="h-10 w-3/4" />

          {/* Rating e Avaliações */}
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-4 w-4 rounded-full" />
              ))}
            </div>
            <Skeleton className="h-4 w-32 ml-3" />
          </div>
        </div>

        {/* Preço */}
        <div className="flex items-center gap-4">
          <Skeleton className="h-12 w-40" />
          <Skeleton className="h-8 w-24" />
        </div>

        {/* Descrição */}
        <div className="space-y-2 border-l-4 border-slate-200 pl-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>

        {/* Seleção de Tamanhos */}
        <div className="space-y-4">
          <Skeleton className="h-3 w-32" />
          <div className="flex gap-3">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="w-14 h-12 rounded-md" />
            ))}
          </div>
        </div>

        {/* Botão de Compra */}
        <Skeleton className="w-full h-16 rounded-xl" />

        {/* Infos de Frete/Garantia */}
        <div className="grid grid-cols-2 gap-4 pt-4">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
        </div>

        <Separator />

        {/* SKU */}
        <Skeleton className="h-4 w-24" />
      </div>
    </main>
  );
};

export default ProductDetailsSkeleton;
