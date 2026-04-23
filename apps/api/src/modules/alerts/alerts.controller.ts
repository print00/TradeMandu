import { StatusCodes } from "http-status-codes";
import type { Request, Response } from "express";
import { prisma } from "../../lib/prisma.js";
import { asyncHandler } from "../../utils/async-handler.js";

export const listAlertsController = asyncHandler(async (req: Request, res: Response) => {
  const alerts = await prisma.alert.findMany({
    where: { userId: req.user!.id },
    include: {
      stock: {
        include: { quote: true }
      }
    },
    orderBy: { createdAt: "desc" }
  });

  res.status(StatusCodes.OK).json(alerts);
});

export const createAlertController = asyncHandler(async (req: Request, res: Response) => {
  const alert = await prisma.alert.create({
    data: {
      userId: req.user!.id,
      ...req.body
    }
  });

  res.status(StatusCodes.CREATED).json(alert);
});

export const updateAlertController = asyncHandler(async (req: Request, res: Response) => {
  await prisma.alert.updateMany({
    where: {
      id: req.params.id,
      userId: req.user!.id
    },
    data: req.body
  });

  const alert = await prisma.alert.findFirstOrThrow({
    where: {
      id: req.params.id,
      userId: req.user!.id
    }
  });

  res.status(StatusCodes.OK).json(alert);
});

export const deleteAlertController = asyncHandler(async (req: Request, res: Response) => {
  await prisma.alert.deleteMany({
    where: {
      id: req.params.id,
      userId: req.user!.id
    }
  });

  res.status(StatusCodes.NO_CONTENT).send();
});
