import { StatusCodes } from "http-status-codes";
import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/async-handler.js";
import { refreshSession, requestOtp, verifyOtp } from "./auth.service.js";

export const requestOtpController = asyncHandler(async (req: Request, res: Response) => {
  const result = await requestOtp(req.body.email, req.body.name);
  res.status(StatusCodes.OK).json(result);
});

export const verifyOtpController = asyncHandler(async (req: Request, res: Response) => {
  const result = await verifyOtp(
    req.body.email,
    req.body.otp,
    req.headers["user-agent"],
    req.ip
  );
  res.status(StatusCodes.OK).json(result);
});

export const refreshTokenController = asyncHandler(async (req: Request, res: Response) => {
  const result = await refreshSession(req.body.refreshToken);
  res.status(StatusCodes.OK).json(result);
});

