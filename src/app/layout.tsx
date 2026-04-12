import * as React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import { LinearProgress } from '@mui/material';
import { NextAppProvider } from "@/toolpad-core/nextjs";
import theme from "@/app/theme";
import { Nav } from "@/demo/ui/nav/Nav";
import QueryClientProviderWrapper from "@/swiss-client/provider/QueryClientProviderWrapper";


export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
    <body>
    <InitColorSchemeScript attribute="class"/>
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <React.Suspense fallback={<LinearProgress/>}>
        <QueryClientProviderWrapper>
          <NextAppProvider
            navigation={Nav.menu()}
            theme={theme}
          >
            {props.children}
          </NextAppProvider>
        </QueryClientProviderWrapper>
      </React.Suspense>
    </AppRouterCacheProvider>
    </body>
    </html>
  );
}
