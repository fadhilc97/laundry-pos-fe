import { z } from "zod";

export const createUpdateCurrencySchema = z.object({
  name: z.string().min(1, "Required"),
  symbol: z.string().min(1, "Required"),
});

export type CreateUpdateCurrencyFormInputs = z.infer<
  typeof createUpdateCurrencySchema
>;
