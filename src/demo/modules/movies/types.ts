import { z } from 'zod';
import { MovieInsertSchema, MovieSchema } from "@/demo/lib/db/schema/schema";
import { GridPagination } from "@/swiss/grid";
import { Genre } from "@/demo/modules/genres/types";

export type Movie = z.infer<typeof MovieSchema>
export type MovieWith = Movie & {
  genres: Partial<Genre>[];
};
export type MovieInsert = z.infer<typeof MovieInsertSchema>

export const MovieSearchParamsSchema = z.object({
  year: z.number().int().positive().optional(),
  genres: z.array(z.string()).optional(),
});

export type MovieSearchParams = z.infer<typeof MovieSearchParamsSchema> & GridPagination;
