import Stack from '@mui/material/Stack';
import { Suspense } from "react";
import Box from "@mui/material/Box";
import type { GridRows } from "@/toolpad/utils";
import { getDC } from "@/lib/db/dm";
import { MovieList, MovieSearchParams } from "@/slices/movies/types";
import { MoviesRepository } from "@/slices/movies/services/MoviesRepository";
import CreateMovieDialog from "@/slices/movies/ui/CreateMovieDialog";
import MoviesForm from "@/slices/movies/ui/MoviesForm";
import MoviesGrid from "@/slices/movies/ui/MoviesGrid";

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
