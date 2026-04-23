import Redis from "ioredis";
import { env } from "../config/env.js";

export const redis = new Redis(env.REDIS_URL, {
  lazyConnect: true,
  maxRetriesPerRequest: 1
});

redis.on("error", () => {
  // Redis is optional during local bootstrapping, so errors are swallowed here.
});

export async function getCachedJson<T>(key: string): Promise<T | null> {
  try {
    const payload = await redis.get(key);
    return payload ? (JSON.parse(payload) as T) : null;
  } catch {
    return null;
  }
}

export async function setCachedJson(key: string, value: unknown, ttlSeconds = 30) {
  try {
    await redis.set(key, JSON.stringify(value), "EX", ttlSeconds);
  } catch {
    return null;
  }
}

export async function deleteCachedKey(key: string) {
  try {
    await redis.del(key);
  } catch {
    return null;
  }
}
