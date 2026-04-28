'use client'

import { MovieList } from "@/entities/movie";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import NoSsr from "@mui/material/NoSsr";
import { useDataGrid } from "@/toolpad/core";
import { GridRows } from "@/toolpad/utils";

export default function MoviesGrid({ gridRows, isLoading }: {
  gridRows: GridRows<MovieList>,
  isLoading: boolean
}) {
  const dataGrid = useDataGrid();

  const columns: GridColDef<MovieList>[] = [
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
    },
    {
      field: 'genres',
      headerName: 'Genres',
      flex: 1,
      valueGetter: (params, row) => {
        return row.genres?.filter(Boolean).join(', ');
      }
    }
  ];

  return (
    <NoSsr>
      <DataGrid<MovieList>
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
