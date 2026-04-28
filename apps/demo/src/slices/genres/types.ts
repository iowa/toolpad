import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { genresTable } from "@/lib/db/schema/schema";
import type { GridPagination } from "@/toolpad/utils";

export const GenreSchema = createSelectSchema(genresTable);
export const GenreInsertSchema = createInsertSchema(genresTable);

export type Genre = z.infer<typeof GenreSchema>;
export type GenreInsert = z.infer<typeof GenreInsertSchema>;

export const GenreSearchParamsSchema = z.object({
  name: z.string().optional(),
});

export type GenreSearchParams = z.infer<typeof GenreSearchParamsSchema> &
  GridPagination;
