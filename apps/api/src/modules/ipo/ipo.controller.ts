import { StatusCodes } from "http-status-codes";
import type { Request, Response } from "express";
import { prisma } from "../../lib/prisma.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { getRequiredRouteParam } from "../../utils/route-params.js";

export const listIposController = asyncHandler(async (_req: Request, res: Response) => {
  const ipos = await prisma.ipoOffer.findMany({
    orderBy: [{ openingDate: "asc" }, { createdAt: "desc" }]
  });

  res.status(StatusCodes.OK).json(ipos);
});

export const createReminderController = asyncHandler(async (req: Request, res: Response) => {
  const ipoId = getRequiredRouteParam(req.params.ipoId, "ipoId");

  const reminder = await prisma.ipoReminder.create({
    data: {
      userId: req.user!.id,
      ipoId
    }
  });

  res.status(StatusCodes.CREATED).json(reminder);
});
