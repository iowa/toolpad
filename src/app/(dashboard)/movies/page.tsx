import Stack from '@mui/material/Stack';
import { MovieSearchParams } from '@/app/lib/types/movieTypes';
import { MoviesRepository } from '@/app/lib/db/repository/MoviesRepository';
import MoviesGrid from '@/app/ui/movies/MoviesGrid';
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";

export default async function MoviesPage(props: { searchParams: Promise<MovieSearchParams> }) {
  const searchParams = await props.searchParams;
  return <Stack spacing={2}>
    <Suspense key={JSON.stringify(searchParams)} fallback={<LinearProgress/>}>
      <MoviesData searchParams={searchParams}/>
    </Suspense>
  </Stack>;
}

async function MoviesData({ searchParams }: { searchParams: MovieSearchParams }) {
  const gridRows = await MoviesRepository.search(searchParams);
  return <MoviesGrid gridRows={gridRows}/>;
}
