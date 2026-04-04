import Stack from '@mui/material/Stack';
import { MovieSearchParams } from '@/app/ts/types/movieTypes';
import { MoviesRepository } from '@/app/ts/db/repository/MoviesRepository';
import MoviesGrid from '@/app/ui/movies/MoviesGrid';

export default async function MoviesPage(props: { searchParams: Promise<MovieSearchParams> }) {
  const searchParams = await props.searchParams;
  return <Stack spacing={2}></Stack>;
}

async function MoviesData({ searchParams }: { searchParams: MovieSearchParams }) {
  const data = await MoviesRepository.search(searchParams);
  return <MoviesGrid data={data} isLoading={false} />;
}
