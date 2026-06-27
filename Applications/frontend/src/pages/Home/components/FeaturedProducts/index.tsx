import { Award, Sparkles, Trophy } from "lucide-react";
import Product from "@/components/common/ProductItem";
import ProductSkeleton from "@/components/common/ProductItemSkeleton";

import { useEffect, useState } from "react";
import { useProduct } from "@/hooks/frontend/use-products";

const FeaturedProducts = () => {
  const { GetAllFeatured } = useProduct();
  const { data: response, isLoading } = GetAllFeatured({});

  return (
    <section className="flex flex-col gap-4 p-5 md:px-32">
      {/* Título Sessão */}
      <div className="flex flex-row gap-3	items-center">
        <Trophy size={32} />
        <h2 className="text-3xl font-medium">Featured Products</h2>
      </div>
      {/* Lista de Produtos */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)
          : response.data.map((product, index) => (
              <Product key={product.id} product={product} />
            ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
