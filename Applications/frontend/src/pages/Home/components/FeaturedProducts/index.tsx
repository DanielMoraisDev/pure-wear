import { Award, Sparkles, Trophy } from "lucide-react";
import Product from "@/components/common/Product";
import ProductSkeleton from "@/components/common/ProductSkeleton";

import ten from "@/assets/images/Mens/ten.jpg";
import three from "@/assets/images/Mens/three.jpg";
import eleven from "@/assets/images/Mens/eleven.jpg";
import eight from "@/assets/images/Mens/eight.jpg";
import two from "@/assets/images/Mens/two.jpg";
import fivee from "@/assets/images/Mens/fivee.jpg";
import four from "@/assets/images/Mens/four.jpg";
import six from "@/assets/images/Mens/six.jpg";
import twelve from "@/assets/images/Mens/twelve.jpg";
import nine from "@/assets/images/Mens/nine.jpg";
import { ProductAttributes } from "@/types/products.types";
import { useEffect, useState } from "react";

const FeaturedProducts = () => {
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
          : products.map((product) => (
              <Product key={product.id} product={product} />
            ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
