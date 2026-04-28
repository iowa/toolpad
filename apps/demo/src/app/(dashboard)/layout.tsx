'use client';

import * as React from 'react';
import { Container } from '@mui/material';
import Stack from "@mui/material/Stack";
import { DashboardLayout, ThemeSwitcher } from "@/toolpad/core";
import { AccountMenu } from "@/slices/auth/ui/AccountMenu";


export default function Layout(props: { children: React.ReactNode }) {
  return (
    <DashboardLayout slots={{
      toolbarActions: CustomToolbarActions
    }} sidebarExpandedWidth={200} defaultSidebarCollapsed={false}>
      <Container maxWidth={false} disableGutters={true} sx={{
        px: 2,
        py: 2,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}>
        {props.children}
      </Container>
    </DashboardLayout>
  );
}

function CustomToolbarActions() {
  return (
    <Stack direction="row" sx={{
      alignItems: "center",
    }}>
      <ThemeSwitcher/>
      <AccountMenu/>
    </Stack>
  );
}