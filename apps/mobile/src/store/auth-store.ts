import { create } from "zustand";

type AuthState = {
  accessToken: string | null;
  email: string;
  setSession: (accessToken: string, email: string) => void;
  clearSession: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  email: "",
  setSession: (accessToken, email) => set({ accessToken, email }),
  clearSession: () => set({ accessToken: null, email: "" })
}));

