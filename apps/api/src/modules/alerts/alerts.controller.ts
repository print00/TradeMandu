import { StatusCodes } from "http-status-codes";
import type { Request, Response } from "express";
import { prisma } from "../../lib/prisma.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { getRequiredRouteParam } from "../../utils/route-params.js";

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
  const alertId = getRequiredRouteParam(req.params.id, "id");

  await prisma.alert.updateMany({
    where: {
      id: alertId,
      userId: req.user!.id
    },
    data: req.body
  });

  const alert = await prisma.alert.findFirstOrThrow({
    where: {
      id: alertId,
      userId: req.user!.id
    }
  });

  res.status(StatusCodes.OK).json(alert);
});

export const deleteAlertController = asyncHandler(async (req: Request, res: Response) => {
  const alertId = getRequiredRouteParam(req.params.id, "id");

  await prisma.alert.deleteMany({
    where: {
      id: alertId,
      userId: req.user!.id
    }
  });

  res.status(StatusCodes.NO_CONTENT).send();
});
