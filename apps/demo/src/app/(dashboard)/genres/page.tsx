import Stack from '@mui/material/Stack';
import { Suspense } from "react";
import { getDC } from "@/shared/lib/db-connection";
import type { Genre, GenreSearchParams } from "@/entities/genre";
import { GenresRepository } from "@/entities/genre/@x/server";
import { GenresGrid, GenresForm } from "@/features/genre/search";
import { CreateGenreDialog } from "@/features/genre/create";
import Box from "@mui/material/Box";
import type { GridRows } from "@/toolpad/utils";

export default async function GenresPage(props: { searchParams: Promise<GenreSearchParams> }) {
  const searchParams = await props.searchParams;
  const gridRowsPromise = new GenresRepository(getDC('toolpad')).search(searchParams);

  return (
    <Suspense key={JSON.stringify(searchParams)} fallback={<GenresPageContent isLoading={true}/>}>
      <GenresPageContent gridRowsPromise={gridRowsPromise}/>
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
  const gridRows = gridRowsPromise ? await gridRowsPromise : { rows: [], rowCount: 0 };

  return (
    <Stack spacing={2} sx={{ flex: 1, minHeight: 0 }}>
      <CreateGenreDialog/>
      <GenresForm isLoading={isLoading}/>
      <Box sx={{ flex: 1, minHeight: 0 }}>
        <GenresGrid gridRows={gridRows} isLoading={isLoading}/>
      </Box>
    </Stack>
  );
}
