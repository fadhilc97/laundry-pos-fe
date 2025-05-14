import { z } from "zod";

export const createLaundrySchema = z.object({
  name: z.string().min(1, "Required"),
  address: z.string().min(1, "Required"),
  contacts: z.object({
    whatsapp: z.string().min(1, "Required"),
    phone: z.string(),
    email: z.string(),
    instagram: z.string(),
    website: z.string(),
  }),
});

export type CreateLaundryFormInputs = z.infer<typeof createLaundrySchema>;
