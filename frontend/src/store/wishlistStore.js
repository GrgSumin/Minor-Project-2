import { create } from "zustand";
import { api } from "../api/client";

export const useWishlistStore = create((set, get) => ({
  ids: new Set(),
  items: [],
  loading: false,

  fetch: async () => {
    set({ loading: true });
    try {
      const { data } = await api.get("/wishlist");
      set({
        items: data,
        ids: new Set(data.map((w) => w.product?._id).filter(Boolean)),
        loading: false,
      });
    } catch {
      set({ loading: false });
    }
  },

  toggle: async (productId) => {
    const { data } = await api.post("/wishlist/toggle", { productId });
    const ids = new Set(get().ids);
    if (data.added) ids.add(productId);
    else ids.delete(productId);
    set({ ids });
    return data.added;
  },

  has: (productId) => get().ids.has(productId),

  clear: () => set({ ids: new Set(), items: [] }),
}));
