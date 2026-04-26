'use client'

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import NoSsr from "@mui/material/NoSsr";
import { Genre } from "@/modules/genres/types";
import { GridRows } from "@/toolpad/node/grid";

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
