'use client';

import * as React from 'react';
import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import { DashboardLayout } from '@/toolpad-core/DashboardLayout';

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <DashboardLayout sidebarExpandedWidth={200} defaultSidebarCollapsed={false}>
      <Container maxWidth={false} disableGutters={true} sx={{ px: 2, py: 1 }}>
        <Box sx={{ mt: 1 }}>{props.children}</Box>
      </Container>
    </DashboardLayout>
  );
}
