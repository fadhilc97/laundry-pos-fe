import { z } from "zod";

export const createPaymentSchema = z.object({
  paymentMethod: z.enum(["CASH", "CASHLESS"], { message: "Required" }),
  amount: z.number().positive("Should be positive"),
});

export type CreatePaymentFormInputs = z.infer<typeof createPaymentSchema>;
