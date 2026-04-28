"use client";

import NoSsr from "@mui/material/NoSsr";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import type { Genre } from "@/slices/genres/types";
import type { GridRows } from "@/toolpad/utils";

export default function GenresGrid({
  gridRows,
}: {
  gridRows: GridRows<Genre>;
}) {
  const columns: GridColDef<Genre>[] = [
    {
      field: "name",
      flex: 1,
    },
  ];

  return (
    <NoSsr>
      <DataGrid<Genre> columns={columns} rows={gridRows.rows} />
    </NoSsr>
  );
}
