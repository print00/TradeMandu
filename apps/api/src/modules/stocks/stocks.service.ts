import { Prisma } from "@prisma/client";
import { cacheKeys } from "../../constants/cache-keys.js";
import { prisma } from "../../lib/prisma.js";
import { getCachedJson, setCachedJson } from "../../lib/redis.js";

const stockInclude = {
  quote: true
} satisfies Prisma.StockInclude;

function serializeDecimal<T>(payload: T): T {
  return JSON.parse(
    JSON.stringify(payload, (_key, value) =>
      typeof value === "object" && value && "toNumber" in value ? value.toNumber() : value
    )
  ) as T;
}

export async function listStocks() {
  const cached = await getCachedJson<unknown[]>(cacheKeys.stocks);
  if (cached) return cached;

  const stocks = await prisma.stock.findMany({
    include: stockInclude,
    orderBy: { symbol: "asc" }
  });

  const payload = serializeDecimal(stocks);
  await setCachedJson(cacheKeys.stocks, payload);
  return payload;
}

export async function getTopMovers(direction: "gainers" | "losers") {
  const key = direction === "gainers" ? cacheKeys.topGainers : cacheKeys.topLosers;
  const cached = await getCachedJson<unknown[]>(key);
  if (cached) return cached;

  const stocks = await prisma.stock.findMany({
    include: stockInclude
  });

  stocks.sort((left, right) => {
    const leftValue = Number(left.quote?.changePercent ?? 0);
    const rightValue = Number(right.quote?.changePercent ?? 0);
    return direction === "gainers" ? rightValue - leftValue : leftValue - rightValue;
  });

  const payload = serializeDecimal(stocks.slice(0, 10));
  await setCachedJson(key, payload);
  return payload;
}

export async function getStockDetail(symbol: string) {
  const cacheKey = cacheKeys.stockDetail(symbol);
  const cached = await getCachedJson<unknown>(cacheKey);
  if (cached) return cached;

  const stock = await prisma.stock.findUniqueOrThrow({
    where: { symbol },
    include: {
      quote: true,
      priceHistory: {
        take: 30,
        orderBy: { date: "desc" }
      }
    }
  });

  const payload = serializeDecimal(stock);
  await setCachedJson(cacheKey, payload);
  return payload;
}
