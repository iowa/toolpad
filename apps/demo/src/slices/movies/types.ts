import dayjs from "dayjs";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { moviesGenresTable, moviesTable } from "@/lib/db/schema/schema";
import { GenreSchema } from "@/slices/genres/types";
import type { GridPagination } from "@/toolpad/utils";

export const MovieSchema = createSelectSchema(moviesTable);
export const MovieInsertSchema = createInsertSchema(moviesTable);
export const MovieGenreSchema = createSelectSchema(moviesGenresTable);
export const MovieGenreInsertSchema = createInsertSchema(moviesGenresTable);

export type Movie = z.infer<typeof MovieSchema>;

export type MovieList = Partial<Movie> & {
  genres: string[];
};

export type MovieWith = MovieList & {
  genres: Partial<z.infer<typeof GenreSchema>>[];
};
export type MovieInsert = z.infer<typeof MovieInsertSchema>;

export const MovieSearchParamsSchema = z.object({
  title: z.string().optional(),
  year: z.number().int().positive().optional(),
  premiereDateAfter: z
    .union([
      z.custom<dayjs.Dayjs>((val) => dayjs.isDayjs(val)),
      z.string(),
      z.null(),
    ])
    .optional(),
  premiereDateBefore: z
    .union([z.custom<dayjs.Dayjs>((val) => dayjs.isDayjs(val)), z.string()])
    .nullish()
    .optional(),
  genres: z.array(z.string()).optional(),
  genreObjs: z.array(GenreSchema).optional(),
});

export type MovieSearchParams = z.infer<typeof MovieSearchParamsSchema> &
  GridPagination;
