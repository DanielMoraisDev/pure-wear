import { useState, useEffect, useMemo } from "react";
import { Star, Truck, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/stores/useCartStore";
import {
  Product,
  ProductAttributes,
  ProductCart,
} from "@/types/products.types";
import { useSize } from "@/hooks/admin/use-sizes";

const ProductDetails = ({ product }: { product: Product }) => {
  const { GetAll: getSizes } = useSize();

  const { data: sizes, isLoading: isLoadingSizes } = getSizes({});

  const [activeImage, setActiveImage] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");

  // 	useEffect(() => {
  // 		console.log(product)
  // 	}, [product])

  const { toggleCart, productsInCart } = useCartStore();

  const handleAddToCart = () => {
    const productToCart: ProductCart = {
      id: product?.id,
      name: product?.title,
      img: product?.image_url,
      price: product?.price,
      description: product?.description,
      size: selectedSize,
      quantity: product?.qty,
    };

    toggleCart(productToCart);
  };

  return (
    <main className="grid grid-cols-1 lg:grid-cols-2 gap-12 px-5 md:px-16">
      {/* Dynamic Image Gallery */}
      <div className="flex flex-col-reverse md:flex-row gap-4">
        <div className="flex md:flex-col gap-3 overflow-scroll md:overflow-x-hidden pb-2">
          {product?.product_images?.map((imgObj, idx: number) => (
            <button
              key={idx}
              onMouseEnter={() => setActiveImage(imgObj.image_url)}
              onClick={() => setActiveImage(imgObj.image_url)}
              className={cn(
                "relative min-w-[85px] h-[110px] rounded-lg overflow-scroll md:overflow-hidden transition-all duration-200",
                activeImage === imgObj.image_url
                  ? "scale-105"
                  : "border-transparent opacity-70 hover:opacity-100",
              )}
            >
              <img
                src={imgObj?.image_url}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>

        <div className="flex-1 aspect-[3/4] rounded-2xl overflow-hidden bg-slate-50 border group">
          <img
            src={activeImage == "" ? product?.image_url : activeImage}
            alt={product?.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>
      </div>

      {/* Product Details */}
      <div className="flex flex-col gap-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold text-black tracking-tight">
            {product?.title}
          </h1>
          <div className="flex items-center gap-3">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  fill={i < 3 ? "currentColor" : "none"}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-slate-400 border-l pl-3">
              {"12"} Customer Reviews
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-4xl font-black text-black">
            $ {product?.price.toFixed(2)}
          </span>
          {product?.price && (
            <span className="text-2xl text-slate-300 line-through font-medium">
              $ {product?.compare_price.toFixed(2)}
            </span>
          )}
        </div>

        <p className="text-slate-600 text-lg leading-relaxed border-l-4 border-black pl-4">
          <div dangerouslySetInnerHTML={{ __html: product?.description }}></div>
        </p>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
              Available Sizes
            </span>
          </div>
          <div className="flex gap-3 flex-wrap">
            {sizes?.data
              ?.filter((size) =>
                product?.product_sizes?.some(
                  (product_size) => product_size.size_id === size.id,
                ),
              )
              .map((size) => (
                <Button
                  key={size.id}
                  variant={selectedSize === size.name ? "default" : "outline"}
                  className={cn(
                    "w-14 h-12 text-lg font-bold transition-all",
                    selectedSize === size.name
                      ? "bg-gray-900 text-white"
                      : "hover:border-black hover:text-black",
                  )}
                  onClick={() => setSelectedSize(size.name)}
                >
                  {size.name}
                </Button>
              ))}
          </div>
        </div>

        <Button
          onClick={handleAddToCart}
          className="w-full h-16 text-md md:text-xl font-medium bg-black hover:bg-gray-900 rounded-xl transition-all active:scale-[0.98]"
        >
          {productsInCart.some(
            (p) => p.id === product?.id && p.size === selectedSize,
          )
            ? "REMOVE FROM CART"
            : "ADD TO CART"}
        </Button>

        <div className="grid grid-cols-2 gap-4 pt-4 text-xs font-bold text-slate-500 uppercase tracking-tighter">
          <div className="flex items-center gap-2">
            <Truck size={18} className="text-black" /> Express Shipping
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck size={18} className="text-black" /> 30-Day Warranty
          </div>
        </div>

        <Separator />
        <div className="text-sm font-medium text-slate-400">
          SKU: <span className="text-slate-900">{product?.sku}</span>
        </div>
      </div>
    </main>
  );
};

export default ProductDetails;
