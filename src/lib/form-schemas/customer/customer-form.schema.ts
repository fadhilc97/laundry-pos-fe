import { z } from "zod";

export const createUpdateCustomerSchema = z.object({
  name: z.string().min(1, "Required"),
  address: z.string().min(1, "Required"),
  whatsappPhone: z.string().min(1, "Required"),
});

export type CreateUpdateCustomerInputs = z.infer<
  typeof createUpdateCustomerSchema
>;
