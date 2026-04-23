"use client";

import { create } from "zustand";
import type { PortfolioResponse } from "@/types";

type PortfolioState = {
  data: PortfolioResponse | null;
  loading: boolean;
  setData: (data: PortfolioResponse) => void;
  setLoading: (loading: boolean) => void;
};

export const usePortfolioStore = create<PortfolioState>((set) => ({
  data: null,
  loading: false,
  setData: (data) => set({ data }),
  setLoading: (loading) => set({ loading })
}));

