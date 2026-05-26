import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      drawerOpen: false,

      openDrawer: () => set({ drawerOpen: true }),
      closeDrawer: () => set({ drawerOpen: false }),

      addItem: (product, quantity = 1) =>
        set((state) => {
          const existing = state.items.find((i) => i.product === product._id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.product === product._id ? { ...i, quantity: i.quantity + quantity } : i
              ),
            };
          }
          return {
            items: [
              ...state.items,
              {
                product: product._id,
                title: product.title,
                price: product.price,
                image: product.image,
                stock: product.stock,
                quantity,
              },
            ],
          };
        }),

      setQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items
            .map((i) => (i.product === productId ? { ...i, quantity: Math.max(1, quantity) } : i))
            .filter((i) => i.quantity > 0),
        })),

      removeItem: (productId) =>
        set((state) => ({ items: state.items.filter((i) => i.product !== productId) })),

      clear: () => set({ items: [] }),

      subtotal: () => get().items.reduce((s, i) => s + i.price * i.quantity, 0),
      count: () => get().items.reduce((s, i) => s + i.quantity, 0),
    }),
    { name: "im-cart" }
  )
);
