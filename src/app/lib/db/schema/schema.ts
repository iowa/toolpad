import * as p from 'drizzle-orm/pg-core';
import { createSelectSchema } from "drizzle-zod";

export const toolpadPgSchema = p.pgSchema('toolpad');

export const moviesTable = toolpadPgSchema.table("movies", {
  id: p.serial("id").primaryKey(),
  title: p.varchar("title", { length: 255 }).notNull(),
  year: p.integer("year").notNull(),
  overview: p.text("overview"),
  rating: p.integer("rating"),
  runtimeMinutes: p.integer("runtime_minutes"),
  premiereDate: p.timestamp("premiere_date"),
});

export const MoviesSchema = createSelectSchema(moviesTable);