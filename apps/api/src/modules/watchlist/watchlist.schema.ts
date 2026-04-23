import { z } from "zod";

export const watchlistSchema = z.object({
  stockId: z.string().min(5)
});

