import { LinearProgress } from "@mui/material";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { type ReactNode, Suspense } from "react";
import ToolpadProvider from "@/shared/providers/toolpad-provider";
import { auth } from "@/slices/auth/auth";

export default async function RootLayout(props: { children: ReactNode }) {
  const session = await auth();
  return (
    <html data-toolpad-color-scheme="light" lang="en" suppressHydrationWarning>
      <head>
        <title>Toolpad</title>
        <link href="/favicon.ico" rel="icon" />
      </head>
      <body suppressHydrationWarning>
        <InitColorSchemeScript attribute="class" />
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <Suspense fallback={<LinearProgress />}>
            <SessionProvider session={session}>
              <ToolpadProvider>{props.children}</ToolpadProvider>
            </SessionProvider>
          </Suspense>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
