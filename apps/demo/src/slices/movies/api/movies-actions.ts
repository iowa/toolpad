"use server";

import { getDC } from "@/lib/db/dm";
import { GenresRepository } from "@/slices/genres/services/genres-repository";
import { MoviesRepository } from "@/slices/movies/services/movies-repository";
import { TestMovies } from "@/slices/movies/testing/test-movies";
import type { MovieSearchParams } from "@/slices/movies/types";

export async function searchMovies(searchParams: MovieSearchParams = {}) {
  const repository = new MoviesRepository(getDC("toolpad"));
  return await repository.search(searchParams);
}

export async function seedMovies() {
  const dc = getDC("toolpad");
  const testMovies = new TestMovies(
    new MoviesRepository(dc),
    new GenresRepository(dc)
  );
  await testMovies.create(TestMovies.Matrix);
  await testMovies.create(TestMovies.FellowshipOfTheRing);
  await testMovies.create(TestMovies.Inception);
  await testMovies.create(TestMovies.HatefulEight);
}
