import { StatusCodes } from "http-status-codes";
import type { Request, Response } from "express";

export function notFoundHandler(_req: Request, res: Response) {
  return res.status(StatusCodes.NOT_FOUND).json({
    message: "Route not found"
  });
}

