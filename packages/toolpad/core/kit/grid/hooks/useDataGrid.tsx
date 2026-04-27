import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { GridPaginationModel } from '@mui/x-data-grid';
import { useRouter } from "next/navigation.js";
import { GridPaginationDefaults } from "../../../../utils/grid";


export function useDataGrid() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const paginationModel: GridPaginationModel = useMemo((): GridPaginationModel => {
    return {
      page: Number(searchParams.get('page') ?? GridPaginationDefaults.page),
      pageSize: Number(searchParams.get('pageSize') ?? GridPaginationDefaults.pageSize),
    };
  }, [searchParams]);

  const onPaginationModelChange = useCallback(
    (model: GridPaginationModel) => {
      const queryParams = new URLSearchParams(searchParams.toString());
      queryParams.set('page', model.page.toString());
      queryParams.set('pageSize', model.pageSize.toString());
      router.push(`?${queryParams}`)
    },
    [searchParams],
  );

  return {
    paginationModel,
    onPaginationModelChange,
  };
}

