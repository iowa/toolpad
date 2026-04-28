"use server";

import { getDC } from "@/lib/db/dm";
import { GenresRepository } from "@/slices/genres/services/genres-repository";
import type { GenreSearchParams } from "@/slices/genres/types";

export async function fetchGenres(searchParams: GenreSearchParams = {}) {
  const repository = new GenresRepository(getDC("toolpad"));
  return await repository.search(searchParams);
}
