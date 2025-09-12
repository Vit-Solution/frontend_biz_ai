import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthStore = {
  isAuthenticated: boolean;
  setAuthenticated: (value: boolean) => void;
  clearAuth: () => void;
};

export const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      isAuthenticated: false,
      setAuthenticated: (value) => set({ isAuthenticated: value }),
      clearAuth: () => set({ isAuthenticated: false }),
    }),
    { name: "auth-storage" } // localStorage key
  )
);
