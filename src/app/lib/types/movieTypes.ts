import { z } from 'zod';
import { MoviesInsertSchema, MoviesSchema } from "@/app/lib/db/schema/schema";

export type Movie = z.infer<typeof MoviesSchema>
export type MovieInsert = z.infer<typeof MoviesInsertSchema>

export const MovieSearchParamsSchema = z.object({
  year: z.number().int().positive().optional(),
});

export type MovieSearchParams = z.infer<typeof MovieSearchParamsSchema>;
