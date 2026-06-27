import { ArrowLeft, CreditCard, MapPin, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useCartStore, useCartTotal } from "@/stores/useCartStore";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Checkout = () => {
  const navigate = useNavigate();
  const { productsInCart, clearCart } = useCartStore();
  const total = useCartTotal();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (productsInCart.length === 0 && !isLoading) {
      navigate("/cart");
    }
  }, [productsInCart, isLoading, navigate]);

  const handleFinalizeOrder = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Order placed successfully!");
    clearCart();
    navigate("/");
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 lg:px-8 space-y-8">
        <Skeleton className="h-10 w-48" />
        <div className="grid gap-10 lg:grid-cols-12">
          <Skeleton className="lg:col-span-8 h-[600px] rounded-xl" />
          <Skeleton className="lg:col-span-4 h-[400px] rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 lg:px-8">
      <div className="mb-8 flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/cart")}
          className="rounded-full"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Checkout</h1>
      </div>

      <form
        onSubmit={handleFinalizeOrder}
        className="grid gap-10 lg:grid-cols-12"
      >
        {/* Formulários (Esquerda) */}
        <div className="lg:col-span-8 space-y-10">
          <section className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-primary/10 p-2.5 rounded-lg text-primary">
                <MapPin className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-semibold">Shipping Address</h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="John" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Doe" required />
              </div>
              <div className="grid gap-2 md:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" placeholder="123 Main St" required />
              </div>
              <div className="grid gap-2 md:col-span-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>
          </section>

          <section className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-primary/10 p-2.5 rounded-lg text-primary">
                <CreditCard className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-semibold">Payment Details</h2>
            </div>
            <div className="grid gap-5">
              <div className="grid gap-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  placeholder="0000 0000 0000 0000"
                  required
                />
              </div>
            </div>
          </section>
        </div>

        {/* Resumo (Direita) */}
        <div className="lg:col-span-4 lg:sticky lg:top-8 lg:h-fit">
          <div className="rounded-xl border bg-card p-6 shadow-sm space-y-6">
            <h2 className="text-lg font-semibold">Order Summary</h2>

            <ScrollArea className="h-full max-h-[300px] pr-3">
              <div className="space-y-4">
                {productsInCart.map((product) => (
                  <div
                    key={`${product.id}-${product.size}`}
                    className="flex items-center gap-4"
                  >
                    <div className="relative h-16 w-16 flex-shrink-0">
                      <img
                        src={product.img}
                        alt={product.name}
                        className="h-full w-full rounded-md border object-cover bg-muted"
                      />
                      {/* Badge de Quantidade sobre a imagem */}
                      <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground shadow-sm">
                        {product.quantity}
                      </span>
                    </div>

                    <div className="flex-1 text-sm">
                      <p className="font-medium line-clamp-1">{product.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Size: {product.size}{" "}
                        {product.quantity > 1 && `(x${product.quantity})`}
                      </p>
                    </div>

                    <span className="text-sm font-medium">
                      $ {(product.price * product.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <Separator />

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>$ {total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg text-primary">
                <span>Total</span>
                <span>$ {total.toFixed(2)}</span>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full py-6 text-base font-bold rounded-xl shadow-lg transition-all hover:scale-[1.02]"
            >
              Complete Order
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
