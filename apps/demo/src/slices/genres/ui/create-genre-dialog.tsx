"use client";

import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import CreateGenreDialogForm from "@/slices/genres/ui/create-genre-dialog-form";
import { type DialogProps, DialogsProvider, useDialogs } from "@/toolpad/core";

function Content({ open, onClose }: DialogProps<undefined, string | null>) {
  return (
    <Dialog fullWidth onClose={() => onClose(null)} open={open}>
      <DialogTitle>Create Genre</DialogTitle>
      <DialogContent>
        <CreateGenreDialogForm />
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
        Create Genre
      </Button>
    </Stack>
  );
}

export default function CreateGenreDialog() {
  return (
    <DialogsProvider>
      <DialogWrapper />
    </DialogsProvider>
  );
}
