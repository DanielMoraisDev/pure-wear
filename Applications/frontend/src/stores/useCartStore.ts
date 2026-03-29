import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ProductCart } from "@/types/products.types";

interface CartState {
  productsInCart: ProductCart[];
  toggleCart: (product: ProductCart) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      productsInCart: [],

      toggleCart: (product) =>
        set((state) => {
          // 1. Verifica se a combinação ID + SIZE já existe
          const exists = state.productsInCart.some(
            (item) => item.id === product.id && item.size === product.size,
          );

          if (exists) {
            // 2. Remove APENAS o item que tem o ID E o SIZE iguais
            return {
              productsInCart: state.productsInCart.filter(
                (item) =>
                  !(item.id === product.id && item.size === product.size),
              ),
            };
          }

          // 3. Adiciona se não existir
          return {
            productsInCart: [...state.productsInCart, product],
          };
        }),

      clearCart: () => set({ productsInCart: [] }),
    }),
    {
      name: "cart-storage", // Chave no LocalStorage
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

// Totalizer (poupa memoria)
export const useCartTotal = () => {
  const products = useCartStore((state) => state.productsInCart);
  return products.reduce((acc, item) => acc + item.price, 0);
};

export const useCartCount = () => {
  const products = useCartStore((state) => state.productsInCart);
  return products.length;
};
