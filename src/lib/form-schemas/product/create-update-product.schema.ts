import { z } from "zod";

export const createUpdateProductSchema = z.object({
  name: z.string().min(1, "Required"),
  serviceType: z.string().min(1, "Required"),
  price: z.number().positive("Should not negative or zero (0)"),
  qtyUnitId: z.number().positive("Required"),
  currencyId: z.number().positive("Required"),
});

export type CreateUpdateProductFormInputs = z.infer<
  typeof createUpdateProductSchema
>;
