import Stack from '@mui/material/Stack';
import { Movie, MovieSearchParams } from '@/demo/modules/movies/types';
import { MoviesRepository } from '@/demo/modules/movies/services/MoviesRepository';
import MoviesGrid from '@/demo/modules/movies/ui/grid/MoviesGrid';
import { Suspense } from "react";
import { getDC } from "@/demo/lib/db/dm";
import MoviesForm from "@/demo/modules/movies/ui/form/MoviesForm";
import Box from "@mui/material/Box";
import { GridRows } from "@/swiss/grid";

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
  gridRowsPromise?: Promise<GridRows<Movie>>;
  isLoading?: boolean;
}) {
  const gridRows = gridRowsPromise ? await gridRowsPromise : { rows: [], rowCount: -1 };

  return (
    <Stack spacing={2}>
      <MoviesForm isLoading={isLoading}/>
      <Box sx={{ width: '100%' }}>
        <MoviesGrid gridRows={gridRows} isLoading={isLoading}/>
      </Box>
    </Stack>
  );
}
