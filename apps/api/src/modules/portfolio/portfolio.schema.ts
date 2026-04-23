import { z } from "zod";

export const upsertHoldingSchema = z.object({
  stockId: z.string().min(5),
  quantity: z.number().int().positive(),
  avgPrice: z.number().positive()
});

