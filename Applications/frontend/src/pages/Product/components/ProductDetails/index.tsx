import { useState, useEffect } from "react";
import { Star, Truck, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/stores/useCartStore";
import { ProductAttributes, ProductCart } from "@/types/products.types";

const ProductDetails = ({ product }: { product: ProductAttributes }) => {
  const [activeImage, setActiveImage] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("M");

  const { toggleCart, productsInCart } = useCartStore();

  useEffect(() => {
    if (product && product.images.length > 0) {
      setActiveImage(product.images[0].image);
    }
  }, [product]);

  const currentPrice = product.price - (product.discount || 0);

  const handleAddToCart = () => {
    const productToCart: ProductCart = {
      id: product.id,
      name: product.name,
      img: product.images[0].image,
      price: currentPrice,
      description: product.description,
      size: selectedSize,
    };

    toggleCart(productToCart);
  };

  useEffect(() => {
    console.log("Current cart state:", productsInCart);
  }, [productsInCart]);

  return (
    <main className="grid grid-cols-1 lg:grid-cols-2 gap-12 px-5 md:px-32">
      {/* Dynamic Image Gallery */}
      <div className="flex flex-col-reverse md:flex-row gap-4">
        <div className="flex md:flex-col gap-3 overflow-scroll md:overflow-x-hidden pb-2">
          {product.images.map((imgObj: any, idx: number) => (
            <button
              key={idx}
              onMouseEnter={() => setActiveImage(imgObj.image)}
              onClick={() => setActiveImage(imgObj.image)}
              className={cn(
                "relative min-w-[85px] h-[110px] rounded-lg overflow-scroll md:overflow-hidden transition-all duration-200",
                activeImage === imgObj.image
                  ? "scale-105"
                  : "border-transparent opacity-70 hover:opacity-100",
              )}
            >
              <img
                src={imgObj.image}
                alt={imgObj.imageDescription}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>

        <div className="flex-1 aspect-[3/4] rounded-2xl overflow-hidden bg-slate-50 border group">
          <img
            src={activeImage}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>
      </div>

      {/* Product Details */}
      <div className="flex flex-col gap-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold text-black tracking-tight">
            {product.name}
          </h1>
          <div className="flex items-center gap-3">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  fill={i < product.rating ? "currentColor" : "none"}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-slate-400 border-l pl-3">
              {product.reviewsCount} Customer Reviews
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-4xl font-black text-black">
            $ {currentPrice.toFixed(2)}
          </span>
          {product.discount && (
            <span className="text-2xl text-slate-300 line-through font-medium">
              $ {product.price.toFixed(2)}
            </span>
          )}
        </div>

        <p className="text-slate-600 text-lg leading-relaxed border-l-4 border-black pl-4">
          {product.description}
        </p>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
              Available Sizes
            </span>
          </div>
          <div className="flex gap-3 flex-wrap">
            {product.sizes.map((size: string) => (
              <Button
                key={size}
                variant={selectedSize === size ? "default" : "outline"}
                className={cn(
                  "w-14 h-12 text-lg font-bold transition-all",
                  selectedSize === size
                    ? "bg-gray-900 text-white"
                    : "hover:border-black hover:text-black",
                )}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </Button>
            ))}
          </div>
        </div>

        <Button
          onClick={handleAddToCart}
          className="w-full h-16 text-md md:text-xl font-medium bg-black hover:bg-gray-900 rounded-xl transition-all active:scale-[0.98]"
        >
          {productsInCart.some(
            (p) => p.id === product.id && p.size === selectedSize,
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
          SKU: <span className="text-slate-900">{product.sku}</span>
        </div>
      </div>
    </main>
  );
};

export default ProductDetails;
