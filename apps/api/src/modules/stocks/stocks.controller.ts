import { StatusCodes } from "http-status-codes";
import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/async-handler.js";
import { getStockDetail, getTopMovers, listStocks } from "./stocks.service.js";

export const listStocksController = asyncHandler(async (_req: Request, res: Response) => {
  res.status(StatusCodes.OK).json(await listStocks());
});

export const getStockDetailController = asyncHandler(async (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json(await getStockDetail(req.params.symbol));
});

export const getTopGainersController = asyncHandler(async (_req: Request, res: Response) => {
  res.status(StatusCodes.OK).json(await getTopMovers("gainers"));
});

export const getTopLosersController = asyncHandler(async (_req: Request, res: Response) => {
  res.status(StatusCodes.OK).json(await getTopMovers("losers"));
});

