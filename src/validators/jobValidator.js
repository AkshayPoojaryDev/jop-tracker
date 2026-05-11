import { z } from "zod";

export const jobSchema = z.object({
  company: z.string().min(1),
  role: z.string().min(1),

  status: z.enum([
    "applied",
    "interview",
    "offer",
    "rejected",
  ]),

  applied_date: z.string(),

  notes: z.string().optional(),
});