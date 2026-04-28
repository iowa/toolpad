import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Suspense } from "react";
import { searchMovies } from "@/slices/movies/api/movies-actions";
import type { MovieList, MovieSearchParams } from "@/slices/movies/types";
import CreateMovieDialog from "@/slices/movies/ui/create-movie-dialog";
import MoviesForm from "@/slices/movies/ui/movies-form";
import MoviesGrid from "@/slices/movies/ui/movies-grid";
import type { GridRows } from "@/toolpad/utils";

export default async function MoviesPage(props: {
  searchParams: Promise<MovieSearchParams>;
}) {
  const searchParams = await props.searchParams;
  const gridRowsPromise = searchMovies(searchParams);

  return (
    <Suspense
      fallback={<MoviesPageContent isLoading={true} />}
      key={JSON.stringify(searchParams)}
    >
      <MoviesPageContent gridRowsPromise={gridRowsPromise} />
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
  const gridRows = gridRowsPromise
    ? await gridRowsPromise
    : { rows: [], rowCount: 0 };

  return (
    <Stack spacing={2} sx={{ flex: 1, minHeight: 0 }}>
      <CreateMovieDialog />
      <MoviesForm isLoading={isLoading} />
      <Box sx={{ flex: 1, minHeight: 0 }}>
        <MoviesGrid gridRows={gridRows} isLoading={isLoading} />
      </Box>
    </Stack>
  );
}
