import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

function toNumber(value: number | string | null | undefined) {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : 0;
  }

  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  return 0;
}

export function formatCurrency(value: number | string | null | undefined) {
  return new Intl.NumberFormat("en-NP", {
    style: "currency",
    currency: "NPR",
    maximumFractionDigits: 2
  }).format(toNumber(value));
}

export function formatCompactNumber(value: number | string | null | undefined) {
  return new Intl.NumberFormat("en-NP", {
    notation: "compact",
    maximumFractionDigits: 1
  }).format(toNumber(value));
}

export function formatPercent(value: number | string | null | undefined) {
  const numericValue = toNumber(value);
  return `${numericValue >= 0 ? "+" : ""}${numericValue.toFixed(2)}%`;
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-NP", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(value));
}
