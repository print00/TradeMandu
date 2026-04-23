import { StatusCodes } from "http-status-codes";
import dayjs from "dayjs";
import { env, isProduction } from "../../config/env.js";
import { prisma } from "../../lib/prisma.js";
import { ApiError } from "../../utils/api-error.js";
import {
  compareHash,
  generateOtpCode,
  hashValue,
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken
} from "../../utils/auth.js";

export async function requestOtp(email: string, name?: string) {
  const user = await prisma.user.upsert({
    where: { email },
    update: { ...(name ? { name } : {}) },
    create: {
      email,
      name,
      paperWallet: {
        create: {
          balance: env.PAPER_TRADING_START_BALANCE,
          buyingPower: env.PAPER_TRADING_START_BALANCE,
          startingBalance: env.PAPER_TRADING_START_BALANCE
        }
      }
    }
  });

  const otp = generateOtpCode();
  const codeHash = await hashValue(otp);

  await prisma.otpCode.create({
    data: {
      userId: user.id,
      codeHash,
      expiresAt: dayjs().add(env.OTP_EXPIRY_MINUTES, "minute").toDate()
    }
  });

  return {
    message: "OTP generated successfully",
    ...(isProduction ? {} : { devOtp: otp })
  };
}

export async function verifyOtp(email: string, otp: string, userAgent?: string, ipAddress?: string) {
  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      otpCodes: {
        where: {
          consumedAt: null,
          expiresAt: { gt: new Date() }
        },
        orderBy: {
          createdAt: "desc"
        },
        take: 1
      }
    }
  });

  const latestOtp = user?.otpCodes[0];

  if (!user || !latestOtp) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "OTP not found or expired");
  }

  const isMatch = await compareHash(otp, latestOtp.codeHash);

  if (!isMatch) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid OTP");
  }

  const accessToken = signAccessToken(user.id);
  const refreshToken = signRefreshToken(user.id);

  await prisma.$transaction([
    prisma.otpCode.update({
      where: { id: latestOtp.id },
      data: { consumedAt: new Date() }
    }),
    prisma.session.create({
      data: {
        userId: user.id,
        refreshToken: await hashValue(refreshToken),
        expiresAt: dayjs().add(7, "day").toDate(),
        userAgent,
        ipAddress
      }
    })
  ]);

  return {
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      riskLevel: user.riskLevel,
      linkedBroker: user.linkedBroker
    }
  };
}

export async function refreshSession(refreshToken: string) {
  const payload = verifyRefreshToken(refreshToken);
  const sessions = await prisma.session.findMany({
    where: {
      userId: payload.sub,
      expiresAt: { gt: new Date() }
    }
  });

  const matchingSession = await (async () => {
    for (const session of sessions) {
      if (await compareHash(refreshToken, session.refreshToken)) {
        return session;
      }
    }
    return null;
  })();

  if (!matchingSession) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "Refresh token is invalid");
  }

  return {
    accessToken: signAccessToken(payload.sub)
  };
}

