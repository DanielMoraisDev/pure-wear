import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useEffect, useState } from "react";
import ProductSkeleton from "@/components/common/ProductItemSkeleton";
import Product from "@/components/common/ProductItem";
import Filters from "./components/Filters";
import { products } from "@/dataMockProducts";
import { useFilterStore } from "@/stores/useFilterStore";
import { useProduct } from "@/hooks/frontend/use-products";
import { useSearchParams } from "react-router-dom";

const Shop = () => {
  const [searchParams] = useSearchParams();
  const { search, setFiltersFromURL } = useFilterStore();

  // 1. Sincroniza a URL com o Zustand assim que a página carrega
  useEffect(() => {
    const catsFromUrl = searchParams.get("categories");
    const brandsFromUrl = searchParams.get("brands");

    // Converte a string "1,2,3" em um array de números [1, 2, 3]
    const categoriesArray = catsFromUrl
      ? catsFromUrl.split(",").map(Number).filter(Boolean)
      : [];

    const brandsArray = brandsFromUrl
      ? brandsFromUrl.split(",").map(Number).filter(Boolean)
      : [];

    // Alimenta o Zustand com o estado vindo da URL
    setFiltersFromURL(categoriesArray, brandsArray);
  }, []);

  const categoryQuery = search.categories;
  const brandQuery = search.brands;

  const { GetAll: GetAllProduct } = useProduct();
  const { data: products, isLoading: isLoadingProducts } = GetAllProduct({
    brands: brandQuery,
    categories: categoryQuery,
  });

  return (
    <div className="w-full flex flex-col gap-6">
      <section className="flex flex-col gap-4 p-5 md:px-32">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/products">Shop</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex flex-col md:flex-row gap-2 justify-between">
          <div className="w-full lg:w-[20%] flex-col">
            <Filters />
          </div>
          <div className="w-full lg:w-[80%] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {isLoadingProducts
              ? Array.from({ length: 8 }).map((_, i) => (
                  <ProductSkeleton key={i} />
                ))
              : products?.data?.map((product) => (
                  <Product key={product.id} product={product} />
                ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Shop;
