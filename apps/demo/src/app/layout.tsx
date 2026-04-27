import * as React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import { LinearProgress } from '@mui/material';
import './globals.css';
import { auth } from "@/lib/auth/auth";
import { SessionProvider } from "next-auth/react";
import ToolpadProvider from "@/lib/provider/ToolpadProvider";


export default async function RootLayout(props: { children: React.ReactNode }) {
  const session = await auth();
  return (
    <html lang="en" data-toolpad-color-scheme="light" suppressHydrationWarning>
    <head>
      <title>Toolpad</title>
      <link rel="icon" href="/favicon.ico"/>
    </head>
    <body suppressHydrationWarning>
    <InitColorSchemeScript attribute="class"/>
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <React.Suspense fallback={<LinearProgress/>}>
        <SessionProvider session={session}>
          <ToolpadProvider>
            {props.children}
          </ToolpadProvider>
        </SessionProvider>
      </React.Suspense>
    </AppRouterCacheProvider>
    </body>
    </html>
  );
}
