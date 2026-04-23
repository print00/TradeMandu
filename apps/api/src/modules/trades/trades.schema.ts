import { z } from "zod";

export const paperTradeSchema = z.object({
  stockId: z.string().min(5),
  type: z.enum(["BUY", "SELL"]),
  quantity: z.number().int().positive()
});

