"use client";

import { Container } from "@mui/material";
import Stack from "@mui/material/Stack";
import type * as React from "react";
import { AccountMenu } from "@/slices/auth/ui/account-menu";
import { DashboardLayout, ThemeSwitcher } from "@/toolpad/core";

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <DashboardLayout
      defaultSidebarCollapsed={false}
      sidebarExpandedWidth={200}
      slots={{
        toolbarActions: CustomToolbarActions,
      }}
    >
      <Container
        disableGutters={true}
        maxWidth={false}
        sx={{
          px: 2,
          py: 2,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {props.children}
      </Container>
    </DashboardLayout>
  );
}

function CustomToolbarActions() {
  return (
    <Stack
      direction="row"
      sx={{
        alignItems: "center",
      }}
    >
      <ThemeSwitcher />
      <AccountMenu />
    </Stack>
  );
}
