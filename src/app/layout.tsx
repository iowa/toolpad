import * as React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import { LinearProgress } from '@mui/material';
import './globals.css';
import { auth } from "@/demo/lib/auth/auth";
import { SessionProvider } from "next-auth/react";
import ToolpadProvider from "@/swiss-client/provider/ToolpadProvider";


export default async function RootLayout(props: { children: React.ReactNode }) {
  const session = await auth();
  return (
    <html lang="en" suppressHydrationWarning>
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
