import { z } from "zod";

export const updateUserSchema = z.object({
  roleIds: z.array(z.number()).min(1, "Required"),
});

export type UpdateUserFormInputs = z.infer<typeof updateUserSchema>;
