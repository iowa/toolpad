import LogoutIcon from "@mui/icons-material/Logout";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Popover from "@mui/material/Popover";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {
  bindPopover,
  bindTrigger,
  usePopupState,
} from "material-ui-popup-state/hooks";
import { useAuth } from "@/slices/auth/hooks/use-auth";

export function AccountMenu() {
  const authProvider = useAuth();

  const identity = authProvider.getIdentity();
  const initials = authProvider.getInitials();

  const popupState = usePopupState({
    variant: "popover",
    popupId: "account-menu",
  });
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <IconButton {...bindTrigger(popupState)} size="small">
          <Avatar
            sx={{
              width: 36,
              height: 36,
              fontWeight: 600,
            }}
          >
            {initials}
          </Avatar>
        </IconButton>
      </Box>
      <Popover
        {...bindPopover(popupState)}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
        slotProps={{
          paper: { sx: { width: 320, borderRadius: 2, boxShadow: 3 } },
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{
            alignItems: "center",
            p: "20px 20px 8px 20px",
          }}
        >
          <Avatar
            sx={{
              width: 48,
              height: 48,
              fontWeight: 600,
            }}
          >
            {initials}
          </Avatar>
          <Stack>
            <Typography
              sx={{ fontWeight: 600, lineHeight: 1.2 }}
              variant="subtitle1"
            >
              {identity?.name}
            </Typography>
            <Typography
              sx={{
                color: "text.secondary",
                fontSize: 14,
              }}
              variant="subtitle2"
            >
              {identity?.preferred_username}
            </Typography>
            <Typography
              sx={{
                color: "text.secondary",
                fontSize: 14,
              }}
              variant="subtitle2"
            >
              {identity?.email}
            </Typography>
          </Stack>
        </Stack>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ display: "flex", justifyContent: "flex-end", px: 3, pb: 2 }}>
          <MenuList sx={{ width: "100%", p: 0 }}>
            <MenuItem
              onClick={() => {
                popupState.close();
                authProvider.logout();
              }}
            >
              <ListItemIcon>
                <LogoutIcon color={"primary"} fontSize="small" />
              </ListItemIcon>
              <ListItemText> Sign Out</ListItemText>
            </MenuItem>
          </MenuList>
        </Box>
      </Popover>
    </>
  );
}
