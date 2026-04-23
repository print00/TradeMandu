"use client";

import axios from "axios";
import { storage } from "@/lib/storage";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api/v1";

export const api = axios.create({
  baseURL: API_URL,
  timeout: 15000
});

let refreshPromise: Promise<string | null> | null = null;

async function refreshAccessToken() {
  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = (async () => {
    const refreshToken = storage.getRefreshToken();

    if (!refreshToken) {
      storage.clearAll();
      return null;
    }

    try {
      const response = await axios.post(`${API_URL}/auth/refresh`, { refreshToken });
      const nextAccessToken = response.data.accessToken as string;
      storage.setAccessToken(nextAccessToken);
      return nextAccessToken;
    } catch {
      storage.clearAll();
      return null;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

api.interceptors.request.use((config) => {
  const token = storage.getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as (typeof error.config & { _retry?: boolean }) | undefined;

    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;
      const nextAccessToken = await refreshAccessToken();

      if (nextAccessToken) {
        originalRequest.headers = originalRequest.headers ?? {};
        originalRequest.headers.Authorization = `Bearer ${nextAccessToken}`;
        return api(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);
