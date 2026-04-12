import { BannerItemAttributes } from "@/types/banners.types";

interface BannerItemProps {
  bannerItem: BannerItemAttributes;
}

const BannerItem = ({ bannerItem }: BannerItemProps) => {
  return (
    <div className="relative w-full h-[40vh] md:h-[70vh] overflow-hidden">
      <img
        src={bannerItem.image}
        alt={bannerItem.imageDescription || "Banner image"}
        className="absolute inset-0 w-full h-full object-cover object-top"
        loading="eager" // Banners geralmente são LCP, então carregamos rápido
      />

      {/* Overlay opcional: caso queira colocar texto por cima da imagem, 
         este container garante que o conteúdo fique acima da <img> 
      */}
      <div className="relative z-10 flex h-full w-full items-center justify-center">
        {/* Conteúdo sobre o banner aqui */}
      </div>
    </div>
  );
};

export default BannerItem;
