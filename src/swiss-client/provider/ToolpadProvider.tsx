'use client';

import React from 'react';
import { useSession } from "next-auth/react";
import QueryClientProviderWrapper from "@/swiss-client/provider/QueryClientProviderWrapper";
import { NextAppProvider } from "@/toolpad-core/nextjs";
import { Nav } from "@/demo/ui/nav/Nav";
import theme from "@/app/theme";
import { useAuth } from "@/swiss-client/auth/hooks/useAuth";

export default function ToolpadProvider({ children }: { children: React.ReactNode }) {
  const session = useSession();
  const authProvider = useAuth();

  return <QueryClientProviderWrapper>
    <NextAppProvider
      navigation={Nav.menu()}
      theme={theme}
      session={session.data}
      authentication={{
        signIn: () => authProvider.login(),
        signOut: () => authProvider.logout(),
      }}
    >
      {children}
    </NextAppProvider>
  </QueryClientProviderWrapper>

}
