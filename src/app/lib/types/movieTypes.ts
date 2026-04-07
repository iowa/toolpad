import { z } from 'zod';
import { MovieInsertSchema, MovieSchema } from "@/app/lib/db/schema/schema";

export type Movie = z.infer<typeof MovieSchema>
export type MovieInsert = z.infer<typeof MovieInsertSchema>

export const MovieSearchParamsSchema = z.object({
  year: z.number().int().positive().optional(),
});

export type MovieSearchParams = z.infer<typeof MovieSearchParamsSchema>;
