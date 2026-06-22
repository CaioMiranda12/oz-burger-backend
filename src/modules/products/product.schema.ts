import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(2),
  price: z.number().positive(),
  description: z.string().min(2),
  categoryId: z.string(),
})

export const updateProductSchema = createProductSchema.partial().extend({
  available: z.boolean().optional(),
})
