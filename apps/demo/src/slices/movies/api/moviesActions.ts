'use server';

import { MoviesRepository } from '@/slices/movies/services/MoviesRepository';
import { MovieSearchParams } from '@/slices/movies/types';
import { getDC } from '@/lib/db/dm';
import { TestMovies } from "@/slices/movies/testing/TestMovies";
import { GenresRepository } from "@/slices/genres/services/GenresRepository";

export async function searchMovies(searchParams: MovieSearchParams = {}) {
  const repository = new MoviesRepository(getDC('toolpad'));
  return await repository.search(searchParams);
}

export async function seedMovies(searchParams: MovieSearchParams = {}) {
  const dc = getDC('toolpad');
  const testMovies = new TestMovies(new MoviesRepository(dc), new GenresRepository(dc));
  await testMovies.create(TestMovies.Matrix);
  await testMovies.create(TestMovies.FellowshipOfTheRing);
  await testMovies.create(TestMovies.Inception);
  await testMovies.create(TestMovies.HatefulEight);
}
