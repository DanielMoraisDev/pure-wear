import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay"; // Opcional: para rodar sozinho

import HeroImg from "@/assets/images/banner-1.jpg";
import HeroImg2 from "@/assets/images/banner-2.jpg";
import { useEffect, useState } from "react";
import { BannerItemAttributes } from "@/types/banners.types";
import BannerItem from "./components/BannerItem";
import BannerItemSkeleton from "./components/BannerItemSkeleton";

const Banner = () => {
  const banners: BannerItemAttributes[] = [
    {
      id: "b1",
      image: HeroImg,
      imageDescription:
        "Man with sunglasses wearing a beige sweater against a blue background with the text Simple is More.",
    },
    {
      id: "b2",
      image: HeroImg2,
      imageDescription:
        "Man in a white dress shirt and dark sunglasses adjusting his cuff against a light turquoise background with the text Simple is More.",
    },
  ];

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Gera um número entre 1000ms (1s) e 2000ms (2s)
    const randomDelay = Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000;

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, randomDelay);
  }, []);

  return (
    <section>
      {/* Configuração Carousel */}
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
        className="w-full"
      >
        {/* Banners */}
        <CarouselContent className="ml-0">
          {isLoading
            ? Array.from({ length: 2 }).map((_, i) => (
                <CarouselItem className="pl-0">
                  <BannerItemSkeleton key={i} />
                </CarouselItem>
              ))
            : banners.map((banner) => (
                <CarouselItem className="pl-0">
                  <BannerItem key={banner.id} bannerItem={banner} />
                </CarouselItem>
              ))}
        </CarouselContent>

        {/* Controles */}
        <div className="hidden md:block">
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </div>
      </Carousel>
    </section>
  );
};

export default Banner;
