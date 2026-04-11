"use server";

import { GenresRepository } from '@/app/lib/db/repository/GenresRepository';
import { getDC } from '@/app/lib/db/dm';
import { GenreSearchParams } from "@/app/lib/types/GenreTypes";

export async function fetchGenres(searchParams: GenreSearchParams = {}) {
  const repository = new GenresRepository(getDC('toolpad'));
  return await repository.search(searchParams);
}

