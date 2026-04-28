'use client'

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import NoSsr from "@mui/material/NoSsr";
import { GridRows } from "@/toolpad/utils";
import { Genre } from "@/slices/genres/types";

export default function GenresGrid({ gridRows, isLoading }: {
  gridRows: GridRows<Genre>,
  isLoading?: boolean
}) {
  const columns: GridColDef<Genre>[] = [
    {
      field: 'name',
      flex: 1,
    }
  ];

  return (
    <NoSsr>
      <DataGrid<Genre>
        rows={gridRows.rows}
        columns={columns}
      />
    </NoSsr>
  );
};

