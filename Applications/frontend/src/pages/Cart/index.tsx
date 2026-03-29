import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCartStore, useCartTotal } from "@/stores/useCartStore";

const Cart = () => {
  const { productsInCart, toggleCart, clearCart } = useCartStore();
  const total = useCartTotal();

  if (productsInCart.length === 0) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center gap-4">
        <ShoppingBag className="h-16 w-16 text-muted-foreground/50" />
        <h2 className="text-2xl font-semibold">Seu carrinho está vazio</h2>
        <p className="text-muted-foreground">
          Parece que você ainda não adicionou nenhum produto.
        </p>
        <Button variant="outline" className="mt-2">
          Voltar para a loja
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold tracking-tight">
        Carrinho de Compras
      </h1>

      <div className="grid gap-10 lg:grid-cols-12">
        {/* Lista de Produtos */}
        <div className="lg:col-span-8">
          <ScrollArea className="h-full max-h-[600px] pr-4">
            <div className="space-y-6">
              {productsInCart.map((product) => (
                <div
                  key={`${product.id}-${product.size}`}
                  className="flex items-start gap-4"
                >
                  <div className="w-28 flex-shrink-0 overflow-hidden rounded-sm bg-secondary">
                    <img
                      src={product.img}
                      alt={product.name}
                      className="aspect-[9/16] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  <div className="flex flex-1 flex-col gap-1">
                    <div className="flex justify-between">
                      <h3 className="font-medium leading-none">
                        {product.name}
                      </h3>
                      <p className="font-semibold text-sm">
                        R$ {product.price.toFixed(2)}
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {product.description}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-xs font-medium bg-secondary px-2 py-1 rounded">
                        Tamanho: {product.size}
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
              ))}
            </div>
          </ScrollArea>

          <Button
            variant="link"
            className="mt-6 text-muted-foreground p-0"
            onClick={clearCart}
          >
            Limpar carrinho
          </Button>
        </div>

        {/* Resumo do Pedido */}
        <div className="lg:col-span-4">
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Resumo do Pedido</h2>
            <div className="mt-6 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>R$ {total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Entrega</span>
                <span className="text-green-600 font-medium">Grátis</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>R$ {total.toFixed(2)}</span>
              </div>
            </div>
            <Button className="mt-6 w-full size-lg h-auto px-8 py-3 cursor-pointer">
              Finalizar Compra
            </Button>
            <p className="mt-4 text-center text-xs text-muted-foreground">
              Taxas e frete calculados no checkout
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
