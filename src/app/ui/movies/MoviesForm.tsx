'use client'

import Grid from '@mui/material/Grid';
import CreateMovieDialog from "@/app/ui/movies/dialog/create/CreateMovieDialog";

export default function MoviesForm({}: {}) {
  return (
    <Grid container direction={"row"} spacing={2}>
      <Grid size={12}>
        <CreateMovieDialog/>
      </Grid>
    </Grid>
  );
};
