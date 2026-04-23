"use client";

import { create } from "zustand";
import type { WatchlistItem } from "@/types";

type WatchlistState = {
  items: WatchlistItem[];
  loading: boolean;
  setItems: (items: WatchlistItem[]) => void;
  setLoading: (loading: boolean) => void;
};

export const useWatchlistStore = create<WatchlistState>((set) => ({
  items: [],
  loading: false,
  setItems: (items) => set({ items }),
  setLoading: (loading) => set({ loading })
}));

