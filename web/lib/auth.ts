"use client";

import { api } from "@/lib/api";
import type { AuthResponse } from "@/types";

export async function requestOtp(email: string, name?: string) {
  const response = await api.post("/auth/request-otp", { email, name });
  return response.data as { message: string; devOtp?: string };
}

export async function verifyOtp(email: string, otp: string) {
  const response = await api.post("/auth/verify-otp", { email, otp });
  return response.data as AuthResponse;
}

