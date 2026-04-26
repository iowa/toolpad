'use client'

import { GridRows } from "@/swiss/grid/GridTypes";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import NoSsr from "@mui/material/NoSsr";
import { Genre } from "@/demo/modules/genres/types";

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
