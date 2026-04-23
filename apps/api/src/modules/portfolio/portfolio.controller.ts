import { StatusCodes } from "http-status-codes";
import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/async-handler.js";
import { getPortfolioSummary, upsertHolding } from "./portfolio.service.js";

export const getPortfolioController = asyncHandler(async (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json(await getPortfolioSummary(req.user!.id));
});

export const upsertHoldingController = asyncHandler(async (req: Request, res: Response) => {
  const { stockId, quantity, avgPrice } = req.body;
  const holding = await upsertHolding(req.user!.id, stockId, quantity, avgPrice);
  res.status(StatusCodes.CREATED).json(holding);
});

