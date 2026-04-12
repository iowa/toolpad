import Stack from '@mui/material/Stack';
import { MovieSearchParams } from '@/demo/modules/movies/types';
import { MoviesRepository } from '@/demo/modules/movies/services/MoviesRepository';
import MoviesGrid from '@/demo/modules/movies/ui/grid/MoviesGrid';
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";
import { getDC } from "@/demo/lib/db/dm";
import MoviesForm from "@/demo/modules/movies/ui/form/MoviesForm";

export default async function MoviesPage(props: { searchParams: Promise<MovieSearchParams> }) {
  const searchParams = await props.searchParams;
  return <Stack spacing={2}>
    <MoviesForm/>
    <Suspense key={JSON.stringify(searchParams)} fallback={<LinearProgress/>}>
      <GridData searchParams={searchParams}/>
    </Suspense>
  </Stack>;
}

async function GridData({ searchParams }: { searchParams: MovieSearchParams }) {
  const gridRows = await new MoviesRepository(getDC('toolpad')).search(searchParams);
  return <MoviesGrid gridRows={gridRows}/>;
}
