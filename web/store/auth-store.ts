"use client";

import { create } from "zustand";
import type { User } from "@/types";
import { storage } from "@/lib/storage";

type AuthState = {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  hydrated: boolean;
  setSession: (payload: { user: User; accessToken: string; refreshToken: string }) => void;
  hydrate: () => void;
  clearSession: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  hydrated: false,
  setSession: ({ user, accessToken, refreshToken }) => {
    storage.setUser(user);
    storage.setAccessToken(accessToken);
    storage.setRefreshToken(refreshToken);
    set({ user, accessToken, refreshToken, hydrated: true });
  },
  hydrate: () => {
    set({
      user: storage.getUser(),
      accessToken: storage.getAccessToken(),
      refreshToken: storage.getRefreshToken(),
      hydrated: true
    });
  },
  clearSession: () => {
    storage.clearAll();
    set({ user: null, accessToken: null, refreshToken: null, hydrated: true });
  }
}));

