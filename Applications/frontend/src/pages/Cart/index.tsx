import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useCartStore, useCartTotal } from "@/stores/useCartStore";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CartItemSkeleton from "./components/CartItemSkeleton";
import CartItem from "./components/CartItem";

const Cart = () => {
  const navigate = useNavigate();
  const { productsInCart, clearCart } = useCartStore();
  const total = useCartTotal();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (productsInCart.length === 0 && !isLoading) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center gap-4">
        <ShoppingBag className="h-16 w-16 text-muted-foreground/50" />
        <h2 className="text-2xl font-semibold">Your cart is empty</h2>
        <Button variant="outline" onClick={() => navigate("/products")}>
          Back to Store
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold tracking-tight">Shopping Cart</h1>

      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <ScrollArea className="h-full max-h-[600px] pr-4">
            <div className="space-y-6">
              {isLoading
                ? Array.from({ length: 3 }).map((_, i) => (
                    <CartItemSkeleton key={i} />
                  ))
                : productsInCart.map((product) => (
                    <CartItem
                      key={`${product.id}-${product.size}`}
                      product={product}
                    />
                  ))}
            </div>
          </ScrollArea>

          {!isLoading && (
            <Button
              variant="link"
              className="mt-6 text-muted-foreground p-0"
              onClick={clearCart}
            >
              Clear cart
            </Button>
          )}
        </div>

        <div className="lg:col-span-4">
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Order Summary</h2>
            <div className="mt-6 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                {isLoading ? (
                  <Skeleton className="h-4 w-16" />
                ) : (
                  <span>$ {total.toFixed(2)}</span>
                )}
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                {isLoading ? (
                  <Skeleton className="h-6 w-20" />
                ) : (
                  <span>$ {total.toFixed(2)}</span>
                )}
              </div>
            </div>

            {isLoading ? (
              <Skeleton className="mt-6 h-[48px] w-full rounded-md" />
            ) : (
              <Button
                className="mt-6 w-full py-3"
                onClick={() => navigate("/checkout")}
              >
                Checkout
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
