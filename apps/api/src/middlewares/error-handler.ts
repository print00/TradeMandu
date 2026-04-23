import { Prisma } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { ApiError } from "../utils/api-error.js";

export function errorHandler(
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (error instanceof ZodError) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Validation failed",
      errors: error.flatten()
    });
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: error.message
    });
  }

  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({
      message: error.message
    });
  }

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: "Something went wrong"
  });
}

