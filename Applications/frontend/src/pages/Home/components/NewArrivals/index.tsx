import { Sparkles } from "lucide-react";
import Product from "@/components/common/ProductItem";
import ProductSkeleton from "@/components/common/ProductItemSkeleton";

import { useProduct } from "@/hooks/frontend/use-products";

const NewArrivals = () => {
  const { GetAllLatest } = useProduct();
  const { data: responseLatest, isLoading } = GetAllLatest({});

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
          : responseLatest.data.map((product, index) => (
              <Product key={product.id} product={product} />
            ))}
      </div>
    </section>
  );
};

export default NewArrivals;
