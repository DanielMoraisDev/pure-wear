import { useParams } from "react-router-dom";
import { products } from "@/dataMockProducts";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import ProductTabs from "./components/ProductTabs";
import ProductDetails from "./components/ProductDetails";
import { useEffect, useState } from "react";
import ProductDetailsSkeleton from "./components/ProductDetailsSkeleton";
import ProductTabsSkeleton from "./components/ProductTabsSkeleton";

const Product = () => {
  const { id: productIdentifier } = useParams();
  const product = products.find((p) => p.id === productIdentifier);

  if (!product)
    return (
      <div className="p-20 text-center font-bold text-2xl">
        Produto não encontrado.
      </div>
    );

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Gera um número entre 1000ms (1s) e 2000ms (2s)
    const randomDelay = Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000;

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, randomDelay);
  }, []);

  return (
    <div className="w-full flex flex-col gap-6 pb-20 animate-in fade-in duration-500">
      <section className="p-5 md:px-32">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/products">Shop</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <span className="font-semibold text-slate-900">
                {product.name}
              </span>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </section>

      {/* Módulo das Imagens e Compra */}
      {isLoading ? (
        <ProductDetailsSkeleton />
      ) : (
        <ProductDetails product={product} />
      )}

      {/* Módulo da Descrição e Reviews */}
      {isLoading ? <ProductTabsSkeleton /> : <ProductTabs product={product} />}
    </div>
  );
};

export default Product;
