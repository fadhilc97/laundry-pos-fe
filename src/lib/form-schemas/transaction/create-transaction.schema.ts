import { z } from "zod";

const createTransactionItemSchema = z.object({
  productId: z.number().int("Required"),
  qty: z.number().positive("Should be positive"),
});

export const createTransactionSchema = z.object({
  customerId: z.number().int("Required"),
  serviceType: z.string().min(1, "Required"),
  items: z
    .array(createTransactionItemSchema)
    .min(1, "Should have any quantity"),
});

export type CreateTransactionFormInputs = z.infer<
  typeof createTransactionSchema
>;
