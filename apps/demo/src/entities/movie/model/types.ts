import { z } from 'zod';
import { GenreSchema, MovieInsertSchema, MovieSchema } from "@/shared/lib/db";
import dayjs from 'dayjs';
import { GridPagination } from "@/toolpad/utils";

export type Movie = z.infer<typeof MovieSchema>

export type MovieList = Movie & {
  genres: string[];
};

export type MovieWith = MovieList & {
  genres: Partial<z.infer<typeof GenreSchema>>[];
};
export type MovieInsert = z.infer<typeof MovieInsertSchema>

export const MovieSearchParamsSchema = z.object({
  title: z.string().optional(),
  year: z.number().int().positive().optional(),
  premiereDateAfter: z.union([z.custom<dayjs.Dayjs>((val) => dayjs.isDayjs(val)), z.string(), z.null()]).optional(),
  premiereDateBefore: z.union([z.custom<dayjs.Dayjs>((val) => dayjs.isDayjs(val)), z.string()]).nullish().optional(),
  genres: z.array(z.string()).optional(),
  genreObjs: z.array(GenreSchema).optional(),
});

export type MovieSearchParams = z.infer<typeof MovieSearchParamsSchema> & GridPagination;
