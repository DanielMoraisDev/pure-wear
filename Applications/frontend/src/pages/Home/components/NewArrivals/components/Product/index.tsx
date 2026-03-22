import { ProductAttributes } from "@/types/products.types";

interface ProductProps {
  product: ProductAttributes;
}

const Product = ({ product }: ProductProps) => {
  const handleClickProduct = (e: React.MouseEvent) => {
    alert(product.id);
  };

  return (
    <div
      className="p-2 flex flex-col gap-2 group cursor-pointer"
      onClick={(e) => handleClickProduct(e)}
    >
      <div className="overflow-hidden rounded-md">
        <img
          src={product.image}
          alt={product.imageDescription}
          className="aspect-3/4 w-100 object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div>
        {/* Nome */}
        <p className="text-xl object-cover transition-colors duration-500 group-hover:text-gray-500">
          {product.name}
        </p>
        {/* Preços */}
        <div className="flex flex-row gap-2">
          {product.discount && (
            <span className="text-2xl">${product.discount}</span>
          )}
          <span
            className={`${product.discount ? "text-xl" : "text-2xl"} ${product.discount && "text-muted-foreground line-through"}`}
          >
            ${product.price}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Product;
