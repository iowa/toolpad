"use server";

import { GenresRepository } from '@/modules/genres/services/GenresRepository';
import { getDC } from '@/lib/db/dm';
import { GenreSearchParams } from "@/modules/genres/types";

export async function fetchGenres(searchParams: GenreSearchParams = {}) {
  const repository = new GenresRepository(getDC('toolpad'));
  return await repository.search(searchParams);
}

