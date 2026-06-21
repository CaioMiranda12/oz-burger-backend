import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(2),
  price: z.number().positive(),
  description: z.string().min(2),
})