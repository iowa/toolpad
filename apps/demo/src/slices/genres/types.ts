import { z } from 'zod';
import { GridPagination } from "@/toolpad/utils";
import { GenreInsertSchema, GenreSchema } from "@/lib/db/schema/schema";

export type Genre = z.infer<typeof GenreSchema>
export type GenreInsert = z.infer<typeof GenreInsertSchema>

export const GenreSearchParamsSchema = z.object({
  name: z.string().optional(),
});

export type GenreSearchParams = z.infer<typeof GenreSearchParamsSchema> & GridPagination;