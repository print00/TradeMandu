import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-NP", {
    style: "currency",
    currency: "NPR",
    maximumFractionDigits: 2
  }).format(value);
}

export function formatCompactNumber(value: number) {
  return new Intl.NumberFormat("en-NP", {
    notation: "compact",
    maximumFractionDigits: 1
  }).format(value);
}

export function formatPercent(value: number) {
  return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-NP", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(value));
}

