"use server";

import { GenresRepository } from '@/demo/modules/genres/services/GenresRepository';
import { getDC } from '@/demo/lib/db/dm';
import { GenreSearchParams } from "@/demo/modules/genres/types";

export async function fetchGenres(searchParams: GenreSearchParams = {}) {
  const repository = new GenresRepository(getDC('toolpad'));
  return await repository.search(searchParams);
}

