import Stack from '@mui/material/Stack';
import type { MovieList, MovieSearchParams } from '@/entities/movie';
import { MoviesRepository } from '@/entities/movie/@x/server';
import { MoviesGrid, MoviesForm } from '@/features/movie/search';
import { CreateMovieDialog } from '@/features/movie/create';
import { Suspense } from "react";
import { getDC } from "@/shared/lib/db-connection";
import Box from "@mui/material/Box";
import type { GridRows } from "@/toolpad/utils";

export default async function MoviesPage(props: { searchParams: Promise<MovieSearchParams> }) {
  const searchParams = await props.searchParams;
  const gridRowsPromise = new MoviesRepository(getDC('toolpad')).search(searchParams);

  return (

    <Suspense key={JSON.stringify(searchParams)} fallback={<MoviesPageContent isLoading={true}/>}>
      <MoviesPageContent gridRowsPromise={gridRowsPromise}/>
    </Suspense>

  );
}

async function MoviesPageContent({
                                   gridRowsPromise,
                                   isLoading = false,
                                 }: {
  gridRowsPromise?: Promise<GridRows<MovieList>>;
  isLoading?: boolean;
}) {
  const gridRows = gridRowsPromise ? await gridRowsPromise : { rows: [], rowCount: 0 };

  return (
    <Stack spacing={2} sx={{ flex: 1, minHeight: 0 }}>
      <CreateMovieDialog/>
      <MoviesForm isLoading={isLoading}/>
      <Box sx={{ flex: 1, minHeight: 0 }}>
        <MoviesGrid gridRows={gridRows} isLoading={isLoading}/>
      </Box>
    </Stack>
  );
}
