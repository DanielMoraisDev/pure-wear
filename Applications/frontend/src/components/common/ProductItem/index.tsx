import { ProductAttributes } from "@/types/products.types";
import { useNavigate } from "react-router-dom";

interface ProductProps {
  product: ProductAttributes;
}

const ProductItem = ({ product }: ProductProps) => {
  const navigate = useNavigate();

  const handleClickProduct = (e: React.MouseEvent) => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div
      className="p-2 flex flex-col gap-2 group cursor-pointer"
      onClick={(e) => handleClickProduct(e)}
    >
      <div className="overflow-hidden rounded-md">
        <img
          src={product.images[0].image}
          alt={product.images[0].imageDescription}
          className="aspect-3/4 w-100 object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div>
        {/* Nome */}
        <p className="text-md md:text-xl object-cover transition-colors duration-500 group-hover:text-gray-500">
          {product.name}
        </p>
        {/* Preços */}
        <div className="flex flex-row gap-2">
          {product.discount && (
            <span className="text-lg md:text-2xl">${product.discount}</span>
          )}
          <span
            className={`${product.discount ? "text-md md:text-xl" : "text-lg md:text-2xl"} ${product.discount && "text-muted-foreground line-through"}`}
          >
            ${product.price}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
