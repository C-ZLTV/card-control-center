import { z } from "zod";

export const cardSettingsSchema = z.object({
  cardBlocked: z.boolean(),
  contactlessEnabled: z.boolean(),
  onlinePaymentsEnabled: z.boolean(),
  dailyLimitEnabled: z.boolean(),
  dailyLimit: z
    .number()
    .min(50, "Il limite minimo è di 50 €")
    .max(5000, "Il limite massimo è di 5.000 €"),
});

export type CardSettingsForm = z.infer<typeof cardSettingsSchema>;
