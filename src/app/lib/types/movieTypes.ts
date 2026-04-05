import { z } from 'zod';
import { MoviesSchema } from "@/app/lib/db/schema/schema";

export type Movie = z.infer<typeof MoviesSchema>

export const MovieSearchParamsSchema = z.object({
  year: z.number().int().positive().optional(),
});

export type MovieSearchParams = z.infer<typeof MovieSearchParamsSchema>;
