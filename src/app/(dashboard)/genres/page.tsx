import Stack from '@mui/material/Stack';
import { Suspense } from "react";
import { getDC } from "@/lib/db/dm";
import { Genre, GenreSearchParams } from "@/modules/genres/types";
import { GenresRepository } from "@/modules/genres/services/GenresRepository";
import GenresGrid from "@/modules/genres/ui/grid/GenresGrid";
import GenresForm from "@/modules/genres/ui/form/GenresForm";
import Box from "@mui/material/Box";
import { GridRows } from "@/toolpad/node/grid";

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
      <GenresForm isLoading={isLoading}/>
      <Box sx={{ flex: 1, minHeight: 0 }}>
        <GenresGrid gridRows={gridRows} isLoading={isLoading}/>
      </Box>
    </Stack>
  );
}
