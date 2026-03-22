const ProductSkeleton = () => {
  return (
    <div className="p-2 flex flex-col gap-2 w-full">
      {/* Skeleton da Imagem - Mantendo o aspecto da foto original */}
      <div className="overflow-hidden rounded-md bg-muted animate-pulse aspect-3/4 w-100" />

      <div className="flex flex-col gap-2">
        {/* Skeleton do Nome (Linha mais grossa) */}
        <div className="h-6 w-3/4 bg-muted animate-pulse rounded-md" />

        {/* Skeleton dos Preços */}
        <div className="flex flex-row gap-2 items-center">
          {/* Preço com desconto (simulação) */}
          <div className="h-7 w-20 bg-muted animate-pulse rounded-md" />
          {/* Preço original riscado (simulação) */}
          <div className="h-5 w-16 bg-muted/50 animate-pulse rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
