import { z } from 'zod';
import { GenreInsertSchema, GenreSchema } from "@/app/lib/db/schema/schema";

export type Genre = z.infer<typeof GenreSchema>
export type GenreInsert = z.infer<typeof GenreInsertSchema>
