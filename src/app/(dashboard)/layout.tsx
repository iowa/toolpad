'use client';

import * as React from 'react';
import { Container } from '@mui/material';
import { DashboardLayout } from "@/toolpad-core/DashboardLayout";

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <DashboardLayout sidebarExpandedWidth={200} defaultSidebarCollapsed={false}>
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
