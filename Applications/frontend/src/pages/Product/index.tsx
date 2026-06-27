import { useLocation, useParams } from "react-router-dom";
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
import { useEffect, useMemo, useState } from "react";
import ProductDetailsSkeleton from "./components/ProductDetailsSkeleton";
import ProductTabsSkeleton from "./components/ProductTabsSkeleton";
import { useProduct } from "@/hooks/frontend/use-products";

const Product = () => {
  const { pathname } = useLocation();

  const productId = useMemo(() => {
    // Remove barra final
    const cleanWay = pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;

    const lastIndice = cleanWay.lastIndexOf("/");

    return Number(cleanWay.slice(lastIndice + 1));
  }, [pathname]);

  const { Get: GetProduct } = useProduct();
  const { data: productObj, isLoading: isLoadingProduct } = GetProduct({
    productId: productId,
  });

  const product = productObj?.data;

  if (!product) {
    return (
      <div className="p-20 text-center font-bold text-2xl">
        Produto não encontrado.
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-6 pb-20 animate-in fade-in duration-500">
      <section className="p-5 md:px-16">
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
                {product.title}
              </span>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </section>

      {/* Módulo das Imagens e Compra */}
      {isLoadingProduct ? (
        <ProductDetailsSkeleton />
      ) : (
        <ProductDetails product={product} />
      )}

      {/* Módulo da Descrição e Reviews */}
      {isLoadingProduct ? (
        <ProductTabsSkeleton />
      ) : (
        <ProductTabs product={product} />
      )}
    </div>
  );
};

export default Product;
