import { StatusCodes } from "http-status-codes";
import type { Request, Response } from "express";
import { prisma } from "../../lib/prisma.js";
import { asyncHandler } from "../../utils/async-handler.js";

export const getProfileController = asyncHandler(async (req: Request, res: Response) => {
  const profile = await prisma.user.findUniqueOrThrow({
    where: { id: req.user!.id },
    select: {
      id: true,
      email: true,
      name: true,
      phone: true,
      riskLevel: true,
      linkedBroker: true,
      createdAt: true
    }
  });

  res.status(StatusCodes.OK).json(profile);
});

export const updateProfileController = asyncHandler(async (req: Request, res: Response) => {
  const profile = await prisma.user.update({
    where: { id: req.user!.id },
    data: req.body,
    select: {
      id: true,
      email: true,
      name: true,
      phone: true,
      riskLevel: true,
      linkedBroker: true,
      updatedAt: true
    }
  });

  res.status(StatusCodes.OK).json(profile);
});

