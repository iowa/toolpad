import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Suspense } from "react";
import { getDC } from "@/lib/db/dm";
import { GenresRepository } from "@/slices/genres/services/genres-repository";
import type { Genre, GenreSearchParams } from "@/slices/genres/types";
import CreateGenreDialog from "@/slices/genres/ui/create-genre-dialog";
import GenresForm from "@/slices/genres/ui/genres-form";
import GenresGrid from "@/slices/genres/ui/genres-grid";
import type { GridRows } from "@/toolpad/utils";

export default async function GenresPage(props: {
  searchParams: Promise<GenreSearchParams>;
}) {
  const searchParams = await props.searchParams;
  const gridRowsPromise = new GenresRepository(getDC("toolpad")).search(
    searchParams
  );

  return (
    <Suspense
      fallback={<GenresPageContent isLoading={true} />}
      key={JSON.stringify(searchParams)}
    >
      <GenresPageContent gridRowsPromise={gridRowsPromise} />
    </Suspense>
  );
}

async function GenresPageContent({
  gridRowsPromise,
  isLoading = false,
}: {
  gridRowsPromise?: Promise<GridRows<Genre>>;
  isLoading?: boolean;
}) {
  const gridRows = gridRowsPromise
    ? await gridRowsPromise
    : { rows: [], rowCount: 0 };

  return (
    <Stack spacing={2} sx={{ flex: 1, minHeight: 0 }}>
      <CreateGenreDialog />
      <GenresForm isLoading={isLoading} />
      <Box sx={{ flex: 1, minHeight: 0 }}>
        <GenresGrid gridRows={gridRows} isLoading={isLoading} />
      </Box>
    </Stack>
  );
}
