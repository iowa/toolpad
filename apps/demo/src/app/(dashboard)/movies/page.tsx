import Stack from '@mui/material/Stack';
import { MovieList, MovieSearchParams } from '@/modules/movies/types';
import { MoviesRepository } from '@/modules/movies/services/MoviesRepository';
import MoviesGrid from '@/modules/movies/ui/grid/MoviesGrid';
import { Suspense } from "react";
import { getDC } from "@/lib/db/dm";
import MoviesForm from "@/modules/movies/ui/form/MoviesForm";
import Box from "@mui/material/Box";
import { GridRows } from "@/toolpad/node";

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
      <MoviesForm isLoading={isLoading}/>
      <Box sx={{ flex: 1, minHeight: 0 }}>
        <MoviesGrid gridRows={gridRows} isLoading={isLoading}/>
      </Box>
    </Stack>
  );
}
