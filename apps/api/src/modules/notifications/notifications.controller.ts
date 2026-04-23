import { StatusCodes } from "http-status-codes";
import type { Request, Response } from "express";
import { prisma } from "../../lib/prisma.js";
import { asyncHandler } from "../../utils/async-handler.js";

export const listNotificationsController = asyncHandler(async (req: Request, res: Response) => {
  const items = await prisma.notification.findMany({
    where: { userId: req.user!.id },
    orderBy: { createdAt: "desc" },
    take: 50
  });

  res.status(StatusCodes.OK).json(items);
});

export const registerNotificationTokenController = asyncHandler(
  async (req: Request, res: Response) => {
    const token = await prisma.notificationToken.upsert({
      where: { token: req.body.token },
      update: {
        userId: req.user!.id,
        platform: req.body.platform
      },
      create: {
        userId: req.user!.id,
        token: req.body.token,
        platform: req.body.platform
      }
    });

    res.status(StatusCodes.CREATED).json(token);
  }
);

