import Stack from '@mui/material/Stack';
import { ShipmentsGrid } from '@/app/ui/shipments/ShipmentsGrid';
import ShipmentsForm from '@/app/ui/shipments/ShipmentsForm';
import { Suspense } from 'react';
import { ShipmentsSearchParams } from '@/app/lib/types/shipmentsTypes';
import { ShipmentsRepository } from '@/app/lib/db/repository/ShipmentsRepository';

export default async function MoviesPage(props: {
  searchParams: Promise<ShipmentsSearchParams>;
}) {
  const searchParams = await props.searchParams;
  return (
    <Stack spacing={2}>
      <ShipmentsForm />
      <Suspense
        key={JSON.stringify(searchParams)}
        fallback={<ShipmentsGrid data={[]} isLoading={true} />}
      >
        <MoviesData searchParams={searchParams} />
      </Suspense>
    </Stack>
  );
}

async function MoviesData({ searchParams }: { searchParams: ShipmentsSearchParams }) {
  const data = await ShipmentsRepository.searchSystemReferences(searchParams);
  return <ShipmentsGrid data={data} isLoading={false} />;
}
