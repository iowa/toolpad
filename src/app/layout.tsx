import * as React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import { LinearProgress } from '@mui/material';
import theme from "@/app/theme";
import { NextAppProvider } from "@/toolpad-core/nextjs";
import MovieIcon from '@mui/icons-material/Movie';

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
    <body>
    <InitColorSchemeScript attribute="class"/>
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <React.Suspense fallback={<LinearProgress/>}>
        <NextAppProvider
          navigation={[
            {
              segment: '',
              title: 'Dashboard',
            },
            {
              segment: 'movies',
              title: 'Movies',
              icon: <MovieIcon/>,
            },
          ]}
          theme={theme}
        >
          {props.children}
        </NextAppProvider>
      </React.Suspense>
    </AppRouterCacheProvider>
    </body>
    </html>
  );
}
