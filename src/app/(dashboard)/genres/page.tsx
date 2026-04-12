import Stack from '@mui/material/Stack';
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";
import { getDC } from "@/demo/lib/db/dm";
import { GenreSearchParams } from "@/demo/modules/genres/types";
import { GenresRepository } from "@/demo/modules/genres/services/GenresRepository";
import GenresGrid from "@/demo/modules/genres/ui/grid/GenresGrid";
import GenresForm from "@/demo/modules/genres/ui/form/GenresForm";

export default async function GenresPage(props: { searchParams: Promise<GenreSearchParams> }) {
  const searchParams = await props.searchParams;
  return <Stack spacing={2}>
    <GenresForm/>
    <Suspense key={JSON.stringify(searchParams)} fallback={<LinearProgress/>}>
      <GridData searchParams={searchParams}/>
    </Suspense>
  </Stack>;
}

async function GridData({ searchParams }: { searchParams: GenreSearchParams }) {
  const gridRows = await new GenresRepository(getDC('toolpad')).search(searchParams);
  return <GenresGrid gridRows={gridRows}/>;
}
