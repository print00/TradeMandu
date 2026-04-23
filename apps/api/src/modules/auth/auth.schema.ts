import { z } from "zod";

export const requestOtpSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2).max(80).optional()
});

export const verifyOtpSchema = z.object({
  email: z.string().email(),
  otp: z.string().length(6)
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(10)
});

