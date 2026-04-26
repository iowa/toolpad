import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Stack from '@mui/material/Stack';
import { DialogProps, DialogsProvider, useDialogs } from "@/toolpad-core/useDialogs";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import CreateGenreDialogForm from "@/demo/modules/genres/ui/dialog/create/CreateGenreDialogForm";


function Content({ open, onClose }: DialogProps<undefined, string | null>) {
  return (
    <Dialog fullWidth open={open} onClose={() => onClose(null)}>
      <DialogTitle>Create Genre</DialogTitle>
      <DialogContent>
        <CreateGenreDialogForm/>
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
        Create Genre
      </Button>
    </Stack>
  );
}

export default function CreateGenreDialog() {
  return (
    <DialogsProvider>
      <DialogWrapper/>
    </DialogsProvider>
  );
}
