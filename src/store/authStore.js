import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      loading: false,
      error: null,

      isAuthenticated: () => Boolean(get().token),

      async login({ email, password }) {
        set({ loading: true, error: null });
        try {
          const res = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({ email, password }),
          });
          const data = await res.json();
          if (!res.ok) {
            throw new Error(data.message || "Gagal masuk");
          }
          set({
            user: data.user,
            token: data.token,
            loading: false,
            error: null,
          });
          return data;
        } catch (err) {
          set({ loading: false, error: err.message });
          throw err;
        }
      },

      logout() {
        set({ user: null, token: null, error: null });
      },

      clearError() {
        set({ error: null });
      },
    }),
    {
      name: "kicau-auth",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user, token: state.token }),
    }
  )
);
