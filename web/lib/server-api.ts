import "server-only";
import type {
  IpoOffer,
  PortfolioResponse,
  Stock,
  WatchlistItem
} from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api/v1";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {})
    },
    next: { revalidate: 30 }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${path}`);
  }

  return response.json();
}

async function requestOrFallback<T>(path: string, fallback: T): Promise<T> {
  try {
    return await request<T>(path);
  } catch {
    return fallback;
  }
}

export function getStocks() {
  return requestOrFallback<Stock[]>("/stocks", []);
}

export function getTopGainers() {
  return requestOrFallback<Stock[]>("/stocks/top-gainers", []);
}

export function getTopLosers() {
  return requestOrFallback<Stock[]>("/stocks/top-losers", []);
}

export function getStockDetail(symbol: string) {
  return request<Stock>(`/stocks/${symbol}`);
}

export function getIpos() {
  return requestOrFallback<IpoOffer[]>("/ipo", []);
}

export function getPortfolioWithToken(token: string) {
  return request<PortfolioResponse>("/portfolio", {
    headers: {
      Authorization: `Bearer ${token}`
    },
    cache: "no-store"
  });
}

export function getWatchlistWithToken(token: string) {
  return request<WatchlistItem[]>("/watchlist", {
    headers: {
      Authorization: `Bearer ${token}`
    },
    cache: "no-store"
  });
}
