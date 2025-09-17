import { z } from "zod";

export const createUpdateLocationSchema = z.object({
  name: z.string().min(1, "Required"),
});

export type CreateUpdateLocationFormInputs = z.infer<
  typeof createUpdateLocationSchema
>;
