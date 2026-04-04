import { z } from 'zod';
import { GenreSchema } from '@/app/ts/types/genreType';

export const MovieSchema = z.object({
  id: z.string(),
  title: z.string(),
  year: z.number().int().positive().optional(),
  genres: z.array(GenreSchema),
  rating: z.number().min(0).max(10).optional(),
  runtimeMinutes: z.number().int().nonnegative().optional(),
  overview: z.string().optional(),
  // ISO date string for the movie's premiere/release date
  premiereDate: z.string().optional(),
  posterUrl: z.string().url().optional(),
});

export type Movie = z.infer<typeof MovieSchema>;

export const MovieSearchParamsSchema = z.object({
  year: z.number().int().positive().optional(),
});

export type MovieSearchParams = z.infer<typeof MovieSearchParamsSchema>;
