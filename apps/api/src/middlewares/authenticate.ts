import { StatusCodes } from "http-status-codes";
import type { NextFunction, Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import { verifyAccessToken } from "../utils/auth.js";
import { ApiError } from "../utils/api-error.js";

export async function authenticate(req: Request, _res: Response, next: NextFunction) {
  try {
    const authorization = req.headers.authorization;

    if (!authorization?.startsWith("Bearer ")) {
      return next(new ApiError(StatusCodes.UNAUTHORIZED, "Authentication required"));
    }

    const token = authorization.replace("Bearer ", "");
    const payload = verifyAccessToken(token);
    const user = await prisma.user.findUnique({ where: { id: payload.sub } });

    if (!user) {
      return next(new ApiError(StatusCodes.UNAUTHORIZED, "Invalid session"));
    }

    req.user = user;
    return next();
  } catch {
    return next(new ApiError(StatusCodes.UNAUTHORIZED, "Invalid or expired token"));
  }
}
