import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(1, "Required"),
  email: z.string().min(1, "Required"),
  password: z.string().min(1, "Required"),
  roleIds: z.array(z.number()).min(1, "Required"),
});

export type CreateUserFormInputs = z.infer<typeof createUserSchema>;
