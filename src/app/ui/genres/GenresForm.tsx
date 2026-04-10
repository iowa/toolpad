'use client'

import Grid from '@mui/material/Grid';
import CreateGenreDialog from "@/app/ui/genres/dialog/create/CreateGenreDialog";

export default function GenresForm({}: {}) {
  return (
    <Grid container direction={"row"} spacing={2}>
      <Grid size={12}>
        <CreateGenreDialog/>
      </Grid>
    </Grid>

  );
};
