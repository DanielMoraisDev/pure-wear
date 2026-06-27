const BannerItemSkeleton = () => {
  return (
    <div className="relative w-full h-[40vh] md:h-[70vh] bg-muted animate-pulse overflow-hidden">
      {/* Brilho interno (shimmer) opcional para dar mais realismo */}
      <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/10 to-transparent animate-[shimmer_2s_infinite]" />

      {/* Simulação de conteúdo centralizado (opcional) */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full gap-4">
        <div className="h-10 w-48 md:h-16 md:w-96 bg-foreground/10 rounded-lg" />
        <div className="h-4 w-32 md:h-6 md:w-64 bg-foreground/10 rounded-lg" />
      </div>
    </div>
  );
};

export default BannerItemSkeleton;
