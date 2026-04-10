import Stack from '@mui/material/Stack';
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";
import { getDC } from "@/app/lib/db/dm";
import { GenreSearchParams } from "@/app/lib/types/GenreTypes";
import { GenresRepository } from "@/app/lib/db/repository/GenresRepository";
import GenresGrid from "@/app/ui/genres/GenresGrid";

export default async function GenresPage(props: { searchParams: Promise<GenreSearchParams> }) {
  const searchParams = await props.searchParams;
  return <Stack spacing={2}>
    <Suspense key={JSON.stringify(searchParams)} fallback={<LinearProgress/>}>

      <GridData searchParams={searchParams}/>
    </Suspense>
  </Stack>;
}

async function GridData({ searchParams }: { searchParams: GenreSearchParams }) {
  const gridRows = await new GenresRepository(getDC('toolpad')).search(searchParams);
  return <GenresGrid gridRows={gridRows}/>;
}
