import { z } from "zod";

export const createAlertSchema = z.object({
  stockId: z.string().min(5),
  type: z.enum(["PRICE", "PERCENT_CHANGE", "VOLUME"]),
  direction: z.enum(["ABOVE", "BELOW"]).default("ABOVE"),
  targetPrice: z.number().positive().optional(),
  targetPercent: z.number().positive().optional(),
  targetVolume: z.number().int().positive().optional(),
  enabled: z.boolean().optional()
}).superRefine((value, ctx) => {
  if (value.type === "PRICE" && value.targetPrice == null) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "targetPrice is required for price alerts",
      path: ["targetPrice"]
    });
  }

  if (value.type === "PERCENT_CHANGE" && value.targetPercent == null) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "targetPercent is required for percent change alerts",
      path: ["targetPercent"]
    });
  }

  if (value.type === "VOLUME" && value.targetVolume == null) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "targetVolume is required for volume alerts",
      path: ["targetVolume"]
    });
  }
});
