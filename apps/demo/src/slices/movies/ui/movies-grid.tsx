"use client";

import NoSsr from "@mui/material/NoSsr";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import type { MovieList } from "@/slices/movies/types";
import { useDataGrid } from "@/toolpad/core";
import type { GridRows } from "@/toolpad/utils";

export default function MoviesGrid({
  gridRows,
  isLoading,
}: {
  gridRows: GridRows<MovieList>;
  isLoading: boolean;
}) {
  const dataGrid = useDataGrid();

  const columns: GridColDef<MovieList>[] = [
    {
      field: "title",
      flex: 1,
    },
    {
      field: "year",
      flex: 1,
    },
    {
      field: "premiereDate",
      flex: 1,
    },
    {
      field: "genres",
      headerName: "Genres",
      flex: 1,
      valueGetter: (_params, row) => row.genres?.filter(Boolean).join(", "),
    },
  ];

  return (
    <NoSsr>
      <DataGrid<MovieList>
        columns={columns}
        loading={isLoading}
        onPaginationModelChange={dataGrid.onPaginationModelChange}
        paginationMode="server"
        paginationModel={dataGrid.paginationModel}
        rowCount={gridRows.rowCount}
        rows={gridRows.rows}
      />
    </NoSsr>
  );
}
