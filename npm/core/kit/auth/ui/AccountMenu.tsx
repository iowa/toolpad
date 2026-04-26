import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import Typography from '@mui/material/Typography';
import Popover from '@mui/material/Popover';
import { bindPopover, bindTrigger, usePopupState } from 'material-ui-popup-state/hooks';
import Stack from '@mui/material/Stack';
import ListItemText from '@mui/material/ListItemText';
import { useAuth } from "../hooks";

export function AccountMenu() {
  const authProvider = useAuth();

  const identity = authProvider.getIdentity();
  const initials = authProvider.getInitials();

  const popupState = usePopupState({ variant: 'popover', popupId: 'account-menu' });
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
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
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        slotProps={{ paper: { sx: { width: 320, borderRadius: 2, boxShadow: 3 } } }}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{
            alignItems: 'center',
            p: '20px 20px 8px 20px',
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
            <Typography variant="subtitle1" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
              {identity?.name}
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{
                color: 'text.secondary',
                fontSize: 14,
              }}
            >
              {identity?.preferred_username}
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{
                color: 'text.secondary',
                fontSize: 14,
              }}
            >
              {identity?.email}
            </Typography>
          </Stack>
        </Stack>
        <Divider sx={{ my: 2 }}/>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 3, pb: 2 }}>
          <MenuList sx={{ width: '100%', p: 0 }}>
            <MenuItem
              onClick={() => {
                popupState.close();
                authProvider.logout();
              }}
            >
              <ListItemIcon>
                <LogoutIcon fontSize="small" color={'primary'}></LogoutIcon>
              </ListItemIcon>
              <ListItemText> Sign Out</ListItemText>
            </MenuItem>
          </MenuList>
        </Box>
      </Popover>
    </React.Fragment>
  );
}
