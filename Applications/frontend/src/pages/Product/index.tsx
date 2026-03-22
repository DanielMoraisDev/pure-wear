import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useEffect, useState } from "react";
import ten from "@/assets/images/Mens/ten.jpg";
import three from "@/assets/images/Mens/three.jpg";
import eleven from "@/assets/images/Mens/eleven.jpg";
import eight from "@/assets/images/Mens/eight.jpg";
import two from "@/assets/images/Mens/two.jpg";
import fivee from "@/assets/images/Mens/fivee.jpg";
import four from "@/assets/images/Mens/four.jpg";
import six from "@/assets/images/Mens/six.jpg";
import { ProductAttributes } from "@/types/products.types";
import ProductSkeleton from "@/components/common/ProductSkeleton";
import Product from "@/components/common/Product";
import Filters from "./components/Filters";

const Shop = () => {
  const products: ProductAttributes = {
    id: "1",
    name: "Classic Blue Plaid Shirt",
    price: 49.9,
    image: ten,
    imageDescription:
      "Man wearing a blue and white checkered button-down shirt with sunglasses.",
    sku: "ABC23131",
  };

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Gera um número entre 1000ms (1s) e 2000ms (2s)
    const randomDelay = Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000;

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, randomDelay);
  }, []);

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
          <div className="w-full md:w-[20%] flex-col">
            <Filters />
          </div>
          <div className="w-full md:w-[80%] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"></div>
        </div>
      </section>
    </div>
  );
};

export default Shop;
