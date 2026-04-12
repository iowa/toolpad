'use client'

import Grid from '@mui/material/Grid';
import CreateGenreDialog from "@/demo/modules/genres/ui/dialog/create/CreateGenreDialog";

export default function GenresForm({}: {}) {
  return (
    <Grid container direction={"row"} spacing={2}>
      <Grid size={12}>
        <CreateGenreDialog/>
      </Grid>
    </Grid>
  );
};
