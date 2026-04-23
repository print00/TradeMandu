import { Prisma } from "@prisma/client";
import { cacheKeys } from "../../constants/cache-keys.js";
import { prisma } from "../../lib/prisma.js";
import { emitPortfolioUpdate } from "../../lib/socket.js";
import { deleteCachedKey, getCachedJson, setCachedJson } from "../../lib/redis.js";

function toNumber(value: Prisma.Decimal | number | null | undefined) {
  return value ? Number(value) : 0;
}

export async function getPortfolioSummary(userId: string) {
  const cacheKey = cacheKeys.portfolioSummary(userId);
  const cached = await getCachedJson<unknown>(cacheKey);
  if (cached) return cached;

  const holdings = await prisma.portfolioHolding.findMany({
    where: { userId },
    include: {
      stock: {
        include: {
          quote: true
        }
      }
    }
  });

  const positions = holdings.map((holding) => {
    const currentPrice = toNumber(holding.stock.quote?.ltp);
    const avgPrice = toNumber(holding.avgPrice);
    const marketValue = currentPrice * holding.quantity;
    const invested = avgPrice * holding.quantity;
    const totalPl = marketValue - invested;
    const dailyPl = toNumber(holding.stock.quote?.change) * holding.quantity;

    return {
      id: holding.id,
      stockId: holding.stockId,
      symbol: holding.stock.symbol,
      name: holding.stock.name,
      quantity: holding.quantity,
      avgPrice,
      currentPrice,
      marketValue,
      invested,
      totalPl,
      dailyPl,
      totalPlPercent: invested ? (totalPl / invested) * 100 : 0
    };
  });

  const summary = positions.reduce(
    (acc, position) => {
      acc.marketValue += position.marketValue;
      acc.invested += position.invested;
      acc.totalPl += position.totalPl;
      acc.dailyPl += position.dailyPl;
      return acc;
    },
    {
      marketValue: 0,
      invested: 0,
      totalPl: 0,
      dailyPl: 0
    }
  );

  const payload = {
    summary: {
      ...summary,
      totalPlPercent: summary.invested ? (summary.totalPl / summary.invested) * 100 : 0
    },
    positions
  };

  await setCachedJson(cacheKey, payload);
  return payload;
}

export async function upsertHolding(userId: string, stockId: string, quantity: number, avgPrice: number) {
  const holding = await prisma.portfolioHolding.upsert({
    where: {
      userId_stockId: {
        userId,
        stockId
      }
    },
    update: {
      quantity,
      avgPrice
    },
    create: {
      userId,
      stockId,
      quantity,
      avgPrice
    }
  });

  await deleteCachedKey(cacheKeys.portfolioSummary(userId));
  const payload = await getPortfolioSummary(userId);
  emitPortfolioUpdate(userId, payload);
  return holding;
}
