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
  const products: ProductAttributes[] = [
    {
      id: "1",
      name: "Classic Blue Plaid Shirt",
      price: 49.9,
      image: ten,
      imageDescription:
        "Man wearing a blue and white checkered button-down shirt with sunglasses.",
    },
    {
      id: "2",
      name: "Denim Overlight Jacket",
      price: 89.0,
      image: three,
      imageDescription:
        "Man in a light blue denim shirt over a basic white t-shirt.",
    },
    {
      id: "3",
      name: "Salmon Textured Long Sleeve",
      price: 35.5,
      image: eleven,
      imageDescription:
        "Man with curly hair wearing a salmon-colored textured long sleeve shirt.",
    },
    {
      id: "4",
      name: "Red Buffalo Check Shirt",
      price: 55.0,
      image: eight,
      imageDescription:
        "Smiling man wearing an open red and black checkered shirt over a white tee.",
    },
    {
      id: "5",
      name: "Nude Slim Fit Blazer",
      price: 129.99,
      image: two,
      imageDescription:
        "Stylish man wearing a nude/beige blazer with pink tinted sunglasses.",
    },
    {
      id: "6",
      name: "Just Culture Lavender Tee",
      price: 29.9,
      image: fivee,
      imageDescription:
        "Man wearing a lavender t-shirt with a 'Just Culture' central logo.",
    },
    {
      id: "7",
      name: "Essential Emerald Sweatshirt",
      price: 45.0,
      discount: 38.3,
      image: four,
      imageDescription:
        "Man wearing a classic emerald green crewneck sweatshirt.",
    },
    {
      id: "8",
      name: "Basic White Oversized Tee",
      price: 25.0,
      image: six,
      imageDescription:
        "Man wearing a clean basic white t-shirt and black sunglasses.",
    },
    {
      id: "9",
      name: "Urban Charcoal Hoodie",
      price: 59.9,
      image: four,
      imageDescription: "Man in a dark charcoal grey hoodie looking sideways.",
    },
    {
      id: "10",
      name: "Summer Linen Beige Shirt",
      price: 42.0,
      image: two,
      imageDescription:
        "Close up of a man wearing a breathable beige linen shirt.",
    },
    {
      id: "11",
      name: "Vintage Indigo Denim",
      price: 95.0,
      image: three,
      imageDescription: "Man wearing a vintage washed indigo denim jacket.",
    },
    {
      id: "12",
      name: "Pastel Pink Cotton Tee",
      price: 22.5,
      image: six,
      imageDescription: "Man in a soft pastel pink premium cotton t-shirt.",
    },
    {
      id: "13",
      name: "Midnight Navy Polo",
      price: 38.0,
      image: ten,
      imageDescription: "Man wearing a navy blue polo shirt with white trim.",
    },
    {
      id: "14",
      name: "Autumn Rust Cardigan",
      price: 65.0,
      image: eleven,
      imageDescription: "Man wearing a rust-colored knit cardigan over a tee.",
    },
    {
      id: "15",
      name: "Street Style Graphic Tee",
      price: 32.9,
      image: fivee,
      imageDescription: "Man wearing a graphic tee with abstract urban art.",
    },
    {
      id: "16",
      name: "Premium Black Blazer",
      price: 149.0,
      image: two,
      imageDescription: "Man in a formal slim-fit black blazer.",
    },
    {
      id: "17",
      name: "Classic Flannel Green",
      price: 48.5,
      image: eight,
      imageDescription:
        "Man wearing a green and black flannel checkered shirt.",
    },
    {
      id: "18",
      name: "Desert Sand Long Sleeve",
      price: 39.9,
      image: eleven,
      imageDescription: "Man in a sand-colored lightweight long sleeve shirt.",
    },
    {
      id: "19",
      name: "Ocean Blue Crewneck",
      price: 44.0,
      discount: 10,
      image: four,
      imageDescription: "Man wearing a deep ocean blue crewneck sweatshirt.",
    },
    {
      id: "20",
      name: "Minimalist Grey Tee",
      price: 19.99,
      image: six,
      imageDescription: "Man wearing a heather grey minimalist t-shirt.",
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
        <div className="flex flex-row gap-2 justify-between">
          <div className="w-[20%] flex-col">
            <Filters />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {isLoading
              ? Array.from({ length: 8 }).map((_, i) => (
                  <ProductSkeleton key={i} />
                ))
              : products.map((product) => (
                  <Product key={product.id} product={product} />
                ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Shop;
