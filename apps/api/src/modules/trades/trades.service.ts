import { StatusCodes } from "http-status-codes";
import { TransactionType } from "@prisma/client";
import { prisma } from "../../lib/prisma.js";
import { emitPortfolioUpdate } from "../../lib/socket.js";
import { ApiError } from "../../utils/api-error.js";

function numberValue(value: unknown) {
  return Number(value ?? 0);
}

export async function getPaperTradingState(userId: string) {
  const wallet = await prisma.paperWallet.findUniqueOrThrow({
    where: { userId },
    include: {
      positions: {
        include: {
          stock: {
            include: { quote: true }
          }
        }
      },
      trades: {
        include: { stock: true },
        orderBy: { createdAt: "desc" },
        take: 20
      }
    }
  });

  const positions = wallet.positions.map((position) => {
    const ltp = numberValue(position.stock.quote?.ltp);
    const avgPrice = numberValue(position.avgPrice);
    const marketValue = ltp * position.quantity;
    const invested = avgPrice * position.quantity;

    return {
      id: position.id,
      symbol: position.stock.symbol,
      quantity: position.quantity,
      avgPrice,
      ltp,
      marketValue,
      totalPl: marketValue - invested
    };
  });

  return {
    wallet: {
      id: wallet.id,
      balance: numberValue(wallet.balance),
      buyingPower: numberValue(wallet.buyingPower),
      startingBalance: numberValue(wallet.startingBalance)
    },
    positions,
    trades: wallet.trades.map((trade) => ({
      id: trade.id,
      symbol: trade.stock.symbol,
      type: trade.type,
      quantity: trade.quantity,
      price: numberValue(trade.price),
      total: numberValue(trade.total),
      createdAt: trade.createdAt
    }))
  };
}

export async function executePaperTrade(
  userId: string,
  stockId: string,
  type: TransactionType,
  quantity: number
) {
  const stock = await prisma.stock.findUniqueOrThrow({
    where: { id: stockId },
    include: { quote: true }
  });

  const wallet = await prisma.paperWallet.findUniqueOrThrow({
    where: { userId }
  });

  const price = numberValue(stock.quote?.ltp);
  const total = price * quantity;

  if (!price) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Stock price unavailable");
  }

  const existingPosition = await prisma.paperPosition.findUnique({
    where: {
      walletId_stockId: {
        walletId: wallet.id,
        stockId
      }
    }
  });

  if (type === TransactionType.BUY && numberValue(wallet.buyingPower) < total) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Insufficient virtual buying power");
  }

  if (type === TransactionType.SELL && (!existingPosition || existingPosition.quantity < quantity)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Not enough shares to sell");
  }

  await prisma.$transaction(async (tx) => {
    await tx.paperTrade.create({
      data: {
        userId,
        walletId: wallet.id,
        stockId,
        type,
        quantity,
        price,
        total
      }
    });

    if (type === TransactionType.BUY) {
      const nextQuantity = (existingPosition?.quantity ?? 0) + quantity;
      const nextAvgPrice =
        ((numberValue(existingPosition?.avgPrice) * (existingPosition?.quantity ?? 0)) + total) /
        nextQuantity;

      await tx.paperWallet.update({
        where: { id: wallet.id },
        data: {
          balance: numberValue(wallet.balance) - total,
          buyingPower: numberValue(wallet.buyingPower) - total
        }
      });

      if (existingPosition) {
        await tx.paperPosition.update({
          where: { id: existingPosition.id },
          data: {
            quantity: nextQuantity,
            avgPrice: nextAvgPrice
          }
        });
      } else {
        await tx.paperPosition.create({
          data: {
            userId,
            walletId: wallet.id,
            stockId,
            quantity,
            avgPrice: price
          }
        });
      }
    }

    if (type === TransactionType.SELL && existingPosition) {
      const nextQuantity = existingPosition.quantity - quantity;

      await tx.paperWallet.update({
        where: { id: wallet.id },
        data: {
          balance: numberValue(wallet.balance) + total,
          buyingPower: numberValue(wallet.buyingPower) + total
        }
      });

      if (nextQuantity === 0) {
        await tx.paperPosition.delete({
          where: { id: existingPosition.id }
        });
      } else {
        await tx.paperPosition.update({
          where: { id: existingPosition.id },
          data: { quantity: nextQuantity }
        });
      }
    }
  });

  const payload = await getPaperTradingState(userId);
  emitPortfolioUpdate(userId, payload);
  return payload;
}

