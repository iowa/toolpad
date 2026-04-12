'use client'

import { GridRows } from "@/swiss/grid/GridTypes";
import { MovieWith } from "@/demo/modules/movies/types";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import NoSsr from "@mui/material/NoSsr";

export default function MoviesGrid({ gridRows }: { gridRows: GridRows<MovieWith> }) {
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
    <NoSsr>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid<MovieWith>
          rows={gridRows.rows}
          columns={columns}
        />
      </Box>
    </NoSsr>
  );
};
