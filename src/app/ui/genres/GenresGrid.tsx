'use client'

import { GridRows } from "@/swiss/grid/GridTypes";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import NoSsr from "@mui/material/NoSsr";
import { Genre } from "@/app/lib/types/GenreTypes";

export default function GenresGrid({ gridRows }: { gridRows: GridRows<Genre> }) {
  const columns: GridColDef<Genre>[] = [
    {
      field: 'name',
      flex: 1,
    }
  ];

  return (
    <NoSsr>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid<Genre>
          rows={gridRows.rows}
          columns={columns}
        />
      </Box>
    </NoSsr>
  );
};
