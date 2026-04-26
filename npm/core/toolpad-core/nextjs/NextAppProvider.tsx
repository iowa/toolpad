'use client';

import * as React from 'react';
import { NextAppProviderApp } from './NextAppProviderApp';
import type { AppProviderProps } from '../AppProvider';

function NextAppProvider(props: AppProviderProps) {
  const AppProvider = NextAppProviderApp;
  return <AppProvider {...props} />;
}

export { NextAppProvider };
