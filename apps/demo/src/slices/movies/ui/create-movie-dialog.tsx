"use client";

import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import { type DialogProps, DialogsProvider, useDialogs } from "@/toolpad/core";
import CreateMovieForm from "./create-movie-form";

function Content({ open, onClose }: DialogProps<undefined, string | null>) {
  return (
    <Dialog fullWidth onClose={() => onClose(null)} open={open}>
      <DialogTitle>Create Movie</DialogTitle>
      <DialogContent>
        <CreateMovieForm />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose(null)}>Create</Button>
      </DialogActions>
    </Dialog>
  );
}

function DialogWrapper() {
  const dialogs = useDialogs();
  return (
    <Stack spacing={2}>
      <Button
        onClick={async () => {
          const _result = await dialogs.open(Content);
        }}
        startIcon={<AddCircleOutlineOutlinedIcon />}
      >
        Create Movie
      </Button>
    </Stack>
  );
}

export default function CreateMovieDialog() {
  return (
    <DialogsProvider>
      <DialogWrapper />
    </DialogsProvider>
  );
}
