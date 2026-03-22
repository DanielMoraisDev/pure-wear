const ProductSkeleton = () => {
  return (
    <div className="p-2 flex flex-col gap-2 w-full">
      {/* Skeleton da Imagem - Responsivo */}
      <div className="overflow-hidden rounded-md bg-muted animate-pulse aspect-3/4 w-full" />

      <div className="flex flex-col gap-2">
        {/* Skeleton do Nome (Linha mais fina no mobile se necessário, mas h-6 é ok) */}
        <div className="h-5 md:h-6 w-3/4 bg-muted animate-pulse rounded-md" />

        {/* Skeleton dos Preços */}
        <div className="flex flex-row gap-2 items-center">
          {/* Preço atual */}
          <div className="h-6 md:h-7 w-16 md:w-20 bg-muted animate-pulse rounded-md" />

          {/* Preço antigo (menor) */}
          <div className="h-4 md:h-5 w-12 md:w-16 bg-muted/50 animate-pulse rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
