import { Sparkles } from "lucide-react";
import Product from "@/components/common/ProductItem";
import ProductSkeleton from "@/components/common/ProductItemSkeleton";

import ten from "@/assets/images/Mens/ten.jpg";
import three from "@/assets/images/Mens/three.jpg";
import eleven from "@/assets/images/Mens/eleven.jpg";
import eight from "@/assets/images/Mens/eight.jpg";
import two from "@/assets/images/Mens/two.jpg";
import fivee from "@/assets/images/Mens/fivee.jpg";
import four from "@/assets/images/Mens/four.jpg";
import six from "@/assets/images/Mens/six.jpg";
import { ProductAttributes } from "@/types/products.types";
import { useEffect, useState } from "react";
import { products } from "@/dataMockProducts";

const NewArrivals = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Gera um número entre 1000ms (1s) e 2000ms (2s)
    const randomDelay = Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000;

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, randomDelay);
  }, []);

  return (
    <section className="flex flex-col gap-4 p-5 md:px-32">
      {/* Título Sessão */}
      <div className="flex flex-row gap-3	items-center">
        <Sparkles size={32} />
        <h2 className="text-3xl font-medium">New Arrivals</h2>
      </div>
      {/* Lista de Produtos */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)
          : products
              .slice(0, 8)
              .map((product, index) => (
                <Product key={product.id} product={product} />
              ))}
      </div>
    </section>
  );
};

export default NewArrivals;
