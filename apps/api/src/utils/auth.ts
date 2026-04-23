import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export async function hashValue(value: string) {
  return bcrypt.hash(value, 10);
}

export async function compareHash(value: string, hash: string) {
  return bcrypt.compare(value, hash);
}

export function signAccessToken(userId: string) {
  return jwt.sign({ sub: userId }, env.JWT_ACCESS_SECRET, { expiresIn: env.ACCESS_TOKEN_TTL });
}

export function signRefreshToken(userId: string) {
  return jwt.sign({ sub: userId }, env.JWT_REFRESH_SECRET, { expiresIn: env.REFRESH_TOKEN_TTL });
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, env.JWT_ACCESS_SECRET) as { sub: string };
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, env.JWT_REFRESH_SECRET) as { sub: string };
}

export function generateOtpCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

