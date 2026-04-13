'use client'

import { GridRows } from "@/swiss/grid/GridTypes";
import { MovieWith } from "@/demo/modules/movies/types";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useDataGrid } from "@/swiss-client/hooks/useDataGrid";

export default function MoviesGrid({ gridRows, isLoading }: {
  gridRows: GridRows<MovieWith>,
  isLoading: boolean
}) {
  const dataGrid = useDataGrid();

  const columns: GridColDef<MovieWith>[] = [
    {
      field: 'title',
      flex: 1
    },
    {
      field: 'year',
      flex: 1,
    }
  ];

  return (
    <DataGrid<MovieWith>
      columns={columns}
      rows={gridRows.rows}
      rowCount={gridRows.rowCount}
      loading={isLoading}
      paginationMode="server"
      paginationModel={dataGrid.paginationModel}
      onPaginationModelChange={dataGrid.onPaginationModelChange}
    />

  );
};
