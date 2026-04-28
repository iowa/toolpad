"use server";

import { GenresRepository } from './GenresRepository';
import { getDC } from '@/shared/lib/db-connection';
import type { GenreSearchParams } from "@/entities/genre";

export async function fetchGenres(searchParams: GenreSearchParams = {}) {
  const repository = new GenresRepository(getDC('toolpad'));
  return await repository.search(searchParams);
}

