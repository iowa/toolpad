'use client'

import { GridRows } from "@/swiss/grid/GridTypes";
import { Movie } from "@/demo/modules/movies/types";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import NoSsr from "@mui/material/NoSsr";
import { useDataGrid } from "@/swiss-client";

export default function MoviesGrid({ gridRows, isLoading }: {
  gridRows: GridRows<Movie>,
  isLoading: boolean
}) {
  const dataGrid = useDataGrid();

  const columns: GridColDef<Movie>[] = [
    {
      field: 'title',
      flex: 1
    },
    {
      field: 'year',
      flex: 1,
    },
    {
      field: 'premiereDate',
      flex: 1,
    }
  ];

  return (
    <NoSsr>
      <DataGrid<Movie>
        columns={columns}
        rows={gridRows.rows}
        rowCount={gridRows.rowCount}
        loading={isLoading}
        paginationMode="server"
        paginationModel={dataGrid.paginationModel}
        onPaginationModelChange={dataGrid.onPaginationModelChange}
      />
    </NoSsr>
  );
};
