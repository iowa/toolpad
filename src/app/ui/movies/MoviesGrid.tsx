'use client'

import { GridRows } from "@/swiss/grid/gridTypes";
import { Movie } from "@/app/ts/types/movieTypes";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import NoSsr from "@mui/material/NoSsr";

export default function MoviesGrid({ gridRows }: { gridRows: GridRows<Movie> }) {
  const columns: GridColDef<Movie>[] = [
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
        <DataGrid<Movie>
          rows={gridRows.rows}
          columns={columns}
        />
      </Box>
    </NoSsr>
  );
};
