import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().default(4000),
  CLIENT_URL: z.string().url(),
  DATABASE_URL: z.string().min(1),
  JWT_ACCESS_SECRET: z.string().min(16),
  JWT_REFRESH_SECRET: z.string().min(16),
  ACCESS_TOKEN_TTL: z.string().default("15m"),
  REFRESH_TOKEN_TTL: z.string().default("7d"),
  REDIS_URL: z.string().default("redis://localhost:6379"),
  OTP_EXPIRY_MINUTES: z.coerce.number().default(10),
  PAPER_TRADING_START_BALANCE: z.coerce.number().default(100000)
});

export const env = envSchema.parse(process.env);
export const isProduction = env.NODE_ENV === "production";

