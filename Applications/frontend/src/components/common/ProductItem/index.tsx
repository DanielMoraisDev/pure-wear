import { Product } from "@/types/products.types";
import { useNavigate } from "react-router-dom";

interface ProductProps {
  product: Product;
}

const ProductItem = ({ product }: ProductProps) => {
  const navigate = useNavigate();

  const handleClickProduct = (e: React.MouseEvent) => {
    navigate(`/product/${product.id}`);
  };

  const haveDiscount = product.compare_price > product.price;

  return (
    <div
      className="p-2 flex flex-col gap-2 group cursor-pointer"
      onClick={(e) => handleClickProduct(e)}
    >
      <div className="overflow-hidden rounded-md">
        <img
          src={product.image_url}
          alt={product.title}
          className="aspect-3/4 w-100 object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div>
        {/* Nome */}
        <p className="text-md md:text-xl object-cover transition-colors duration-500 group-hover:text-gray-500">
          {product.title}
        </p>
        {/* Preços */}
        <div className="flex flex-row gap-2">
          {haveDiscount && (
            <span className="text-lg md:text-2xl">${product.price}</span>
          )}
          <span
            className={`${haveDiscount ? "text-md md:text-xl" : "text-lg md:text-2xl"} ${product.compare_price && "text-muted-foreground line-through"}`}
          >
            ${product.compare_price}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
