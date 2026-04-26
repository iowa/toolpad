import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Stack from '@mui/material/Stack';
import { DialogProps, DialogsProvider, useDialogs } from "@/toolpad-core/useDialogs";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import CreateMovieForm from "@/demo/modules/movies/ui/dialog/create/CreateMovieForm";


function Content({ open, onClose }: DialogProps<undefined, string | null>) {
  return (
    <Dialog fullWidth open={open} onClose={() => onClose(null)}>
      <DialogTitle>Create Movie</DialogTitle>
      <DialogContent>
        <CreateMovieForm/>
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
          const result = await dialogs.open(Content);
        }}
        startIcon={<AddCircleOutlineOutlinedIcon/>}
      >
        Create Movie
      </Button>
    </Stack>
  );
}

export default function CreateMovieDialog() {
  return (
    <DialogsProvider>
      <DialogWrapper/>
    </DialogsProvider>
  );
}
