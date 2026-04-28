'use server';

import { MoviesRepository } from '@/slices/movies/services/MoviesRepository';
import { MovieSearchParams } from '@/slices/movies/types';
import { getDC } from '@/lib/db/dm';

export async function searchMovies(searchParams: MovieSearchParams = {}) {
  const repository = new MoviesRepository(getDC('toolpad'));
  return await repository.search(searchParams);
}
