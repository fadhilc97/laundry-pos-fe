import { createLaundrySchema } from "@/lib";
import { z } from "zod";

export const updateLaundrySchema = createLaundrySchema.extend({});

export type UpdateLaundryFormInputs = z.infer<typeof updateLaundrySchema>;
