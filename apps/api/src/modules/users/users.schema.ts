import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z.string().min(2).max(80).optional(),
  phone: z.string().min(7).max(20).optional(),
  riskLevel: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]).optional(),
  linkedBroker: z.string().max(120).optional().nullable()
});

