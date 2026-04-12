import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ProductCart } from "@/types/products.types";
interface CartState {
  productsInCart: ProductCart[];
  toggleCart: (product: ProductCart) => void;
  updateQuantity: (id: string, size: string, delta: number) => void; // delta pode ser +1 ou -1
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      productsInCart: [],

      toggleCart: (product) =>
        set((state) => {
          const exists = state.productsInCart.find(
            (item) => item.id === product.id && item.size === product.size,
          );

          if (exists) {
            return {
              productsInCart: state.productsInCart.filter(
                (item) =>
                  !(item.id === product.id && item.size === product.size),
              ),
            };
          }

          // Adiciona com quantidade inicial 1
          return {
            productsInCart: [
              ...state.productsInCart,
              { ...product, quantity: 1 },
            ],
          };
        }),

      updateQuantity: (id, size, delta) =>
        set((state) => ({
          productsInCart: state.productsInCart
            .map((item) => {
              if (item.id === id && item.size === size) {
                const newQuantity = Math.max(0, item.quantity + delta);
                return { ...item, quantity: newQuantity };
              }
              return item;
            })
            .filter((item) => item.quantity > 0), // Remove se chegar a 0
        })),

      clearCart: () => set({ productsInCart: [] }),
    }),
    { name: "cart-storage" },
  ),
);

// Seletores atualizados para multiplicar pelo quantity
export const useCartTotal = () => {
  const products = useCartStore((state) => state.productsInCart);
  return products.reduce((acc, item) => acc + item.price * item.quantity, 0);
};

export const useCartCount = () => {
  const products = useCartStore((state) => state.productsInCart);
  return products.reduce((acc, item) => acc + item.quantity, 0);
};
