import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      setAuth: (user, token) => set({ user, token }),
      updateUser: (user) => set({ user }),
      logout: () => set({ user: null, token: null }),
    }),
    { name: "im-auth" }
  )
);

export const useIsAuthenticated = () => useAuthStore((s) => !!s.token);
export const useIsAdmin = () => useAuthStore((s) => s.user?.role === "admin");
