import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

async function postJson(path, body) {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.message || "Permintaan gagal");
    err.status = res.status;
    err.errors = data.errors || null;
    throw err;
  }
  return data;
}

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
          const data = await postJson("/login", { email, password });
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

      async register({
        name,
        email,
        password,
        password_confirmation,
        children_age,
      }) {
        set({ loading: true, error: null });
        try {
          const body = { name, email, password, password_confirmation };
          if (children_age !== undefined && children_age !== "") {
            body.children_age = Number(children_age);
          }
          const data = await postJson("/register", body);
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
