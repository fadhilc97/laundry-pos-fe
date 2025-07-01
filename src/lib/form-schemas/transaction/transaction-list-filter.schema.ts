import { z } from "zod";

export const transactionListFilterSchema = z.object({
  search: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  serviceType: z.string().optional(),
  transactionStatus: z.string().optional(),
  paymentStatus: z.string().optional(),
});

export type TransactionListFilterFormInputs = z.infer<
  typeof transactionListFilterSchema
>;
