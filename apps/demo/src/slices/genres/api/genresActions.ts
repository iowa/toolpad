"use server";

import { GenresRepository } from '@/slices/genres/services/GenresRepository';
import { GenreSearchParams } from "@/slices/genres/types";
import { getDC } from "@/lib/db/dm";

export async function fetchGenres(searchParams: GenreSearchParams = {}) {
  const repository = new GenresRepository(getDC('toolpad'));
  return await repository.search(searchParams);
}

