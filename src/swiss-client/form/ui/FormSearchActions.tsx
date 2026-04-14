import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { CircularProgress } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SearchOffIcon from '@mui/icons-material/SearchOff';

export default function FormSearchActions({ reset, isLoading }: {
  reset: () => void,
  isLoading: boolean
}) {
  return (
    <Stack spacing={0.5} direction='row'
           sx={{ justifyContent: "center", alignItems: "center" }}
    >
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth={true}
        startIcon={isLoading ? <CircularProgress size={16} color="inherit"/> : <SearchIcon/>}
        disabled={isLoading}
      >
        Search
      </Button>
      <Button
        variant="contained"
        color="primary"
        fullWidth={true}
        onClick={reset}
        startIcon={<SearchOffIcon/>}
        disabled={isLoading}
      >
        Clear
      </Button>
    </Stack>
  );
};
