import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/useCartStore";
import { ProductCart } from "@/types/products.types";

const CartItem = ({ product }: { product: ProductCart }) => {
  const { toggleCart, updateQuantity } = useCartStore();

  return (
    <div className="flex items-start gap-4">
      <div className="w-28 flex-shrink-0 overflow-hidden rounded-sm bg-secondary">
        <img
          src={product.img}
          alt={product.name}
          className="aspect-[9/16] w-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col gap-1">
        <div className="flex justify-between">
          <h3 className="font-medium leading-none">{product.name}</h3>
          <p className="font-semibold text-sm">
            $ {(product.price * product.quantity).toFixed(2)}
          </p>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-1">
          {product.description}
        </p>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-1 border rounded-md p-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => updateQuantity(product.id, product.size, -1)}
            >
              <Minus className="h-3 w-3" />
            </Button>

            <span className="text-sm font-medium w-6 text-center">
              {product.quantity}
            </span>

            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => updateQuantity(product.id, product.size, 1)}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          <span className="text-xs font-medium bg-secondary px-2 py-1 rounded">
            Size: {product.size}
          </span>
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground hover:text-destructive"
        onClick={() => toggleCart(product)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default CartItem;
