import { StatusCodes } from "http-status-codes";
import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/async-handler.js";
import { executePaperTrade, getPaperTradingState } from "./trades.service.js";

export const getPaperTradingController = asyncHandler(async (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json(await getPaperTradingState(req.user!.id));
});

export const executePaperTradeController = asyncHandler(async (req: Request, res: Response) => {
  const { stockId, type, quantity } = req.body;
  const payload = await executePaperTrade(req.user!.id, stockId, type, quantity);
  res.status(StatusCodes.CREATED).json(payload);
});

