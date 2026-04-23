import { StatusCodes } from "http-status-codes";
import type { Request, Response } from "express";
import { prisma } from "../../lib/prisma.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { getRequiredRouteParam } from "../../utils/route-params.js";

export const getWatchlistController = asyncHandler(async (req: Request, res: Response) => {
  const watchlist = await prisma.watchlist.findMany({
    where: { userId: req.user!.id },
    include: {
      stock: {
        include: {
          quote: true,
          priceHistory: {
            take: 7,
            orderBy: { date: "desc" }
          }
        }
      }
    }
  });

  res.status(StatusCodes.OK).json(watchlist);
});

export const addWatchlistController = asyncHandler(async (req: Request, res: Response) => {
  const item = await prisma.watchlist.create({
    data: {
      userId: req.user!.id,
      stockId: req.body.stockId
    }
  });

  res.status(StatusCodes.CREATED).json(item);
});

export const deleteWatchlistController = asyncHandler(async (req: Request, res: Response) => {
  const stockId = getRequiredRouteParam(req.params.stockId, "stockId");

  await prisma.watchlist.delete({
    where: {
      userId_stockId: {
        userId: req.user!.id,
        stockId
      }
    }
  });

  res.status(StatusCodes.NO_CONTENT).send();
});
