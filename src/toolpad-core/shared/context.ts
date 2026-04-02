'use client';
import * as React from 'react';
import type { PaletteMode } from '@mui/material';
import type { Branding, Navigation, Router } from '../AppProvider';
import type { DashboardSidebarPageItemContextProps } from '../DashboardLayout/DashboardSidebarPageItem';

export const BrandingContext = React.createContext<Branding | null>(null);

export const NavigationContext = React.createContext<Navigation>([]);

export const PaletteModeContext = React.createContext<{
  paletteMode: PaletteMode;
  setPaletteMode: (mode: PaletteMode) => void;
  isDualTheme: boolean;
}>({
  paletteMode: 'light',
  setPaletteMode: () => {},
  isDualTheme: false,
});

export const RouterContext = React.createContext<Router | null>(null);

export const DashboardSidebarPageItemContext =
  React.createContext<DashboardSidebarPageItemContextProps | null>(null);

export const WindowContext = React.createContext<Window | undefined>(undefined);
