import { z } from "zod";

export const registerTokenSchema = z.object({
  token: z.string().min(10),
  platform: z.enum(["ios", "android", "web"])
});

