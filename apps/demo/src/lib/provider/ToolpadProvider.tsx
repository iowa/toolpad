'use client';

import React from 'react';
import { useSession } from "next-auth/react";
import theme from "@/app/theme";
import { Nav } from "@/ui/nav/Nav";
import { NextAppProvider, QueryClientProviderWrapper } from "@/toolpad/core";

export default function ToolpadProvider({ children }: { children: React.ReactNode }) {
  const session = useSession();

  return <QueryClientProviderWrapper>
    <NextAppProvider
      navigation={Nav.menu()}
      theme={theme}
      session={session.data}
    >
      {children}
    </NextAppProvider>
  </QueryClientProviderWrapper>

}
