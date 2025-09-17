import { z } from "zod";

export const createUpdateQuantityUnitSchema = z.object({
  name: z.string().min(1, "Required"),
  shortName: z.string().min(1, "Required"),
});

export type CreateUpdateQuantityUnitFormInputs = z.infer<
  typeof createUpdateQuantityUnitSchema
>;
